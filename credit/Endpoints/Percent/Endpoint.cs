using credit.CriminalRecord;
using credit.Models;
using credit.Models.Enums;
using credit.Shared;
using FluentValidation;
using MinimalApi.Endpoint;
using Request = credit.Endpoints.Percent.Request;

namespace credit.Endpoints.Percent;

public class Endpoint : IEndpoint<IResult, Request>
{
    private readonly IValidator<Request> _validator;

    private static ICheckCriminalRecord _criminalRecord;

    public Endpoint(IValidator<Request> validator, ICheckCriminalRecord criminalRecord)
    {
        _validator = validator;
        _criminalRecord = criminalRecord;
    }

    public async Task<IResult> HandleAsync(Request request)
    {
        var result = await _validator.ValidateAsync(request);

        if (!result.IsValid)
        {
            return Results.BadRequest(result.Errors);
        }

        var points = await CalculatePoints(request);
        var percents = Services.CalculatePercent.CalculatePercentByPoints(points);
        var credit = new Credit
        {
            Approved = percents != 0,
            Percents = percents
        };
        
        return Results.Ok(credit);
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.Map(RouteConstants.Credit.Percents, HandleAsync);
    }

    private static async Task<int> CalculatePoints(Request request)
    {
        var points = 0;
        points += Services.CalculatePercent.CalculatePointsByAge(request.UserPersonal.Age,
            request.CreditSum,
            request.Deposit != Deposit.None);
        points += Services.CalculatePercent.CalculatePointsByDeposit(request.Deposit);
        points += Services.CalculatePercent.CalculatePointsByEmployment(request.Employment, request.UserPersonal.Age);
        points += Services.CalculatePercent.CalculatePointsByPurpose(request.Purpose);
        points += Services.CalculatePercent.CalculatePointsByCreditSum(request.CreditSum);
        var isCertificateOfNoCriminalRecord = await _criminalRecord.IsCertificateOfNoCriminalRecord(request.Passport);
        if (isCertificateOfNoCriminalRecord != request.CriminalRecord)
        {
            
        }
        points += Services.CalculatePercent.CalculatePointsByCriminalRecord(isCertificateOfNoCriminalRecord);
        points += Services.CalculatePercent.CalculatePointsByOtherCredits(request.OtherCredits, request.Purpose);
        return points;
    }
}