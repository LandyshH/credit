using FluentValidation;
using Request = credit.Endpoints.Percent.Request;

namespace credit.Endpoints.Percent;

// ReSharper disable once UnusedType.Global
public class Validator : AbstractValidator<Request>
{
    public Validator()
    {
        RuleFor(r => r.CreditSum)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0)
            .LessThanOrEqualTo(10000000)
            .WithMessage("Credit sum must be greater then 0 rubles and equal or less than 1000000 rubles.");

        RuleFor(r => r.Passport)
            .NotNull();
        RuleFor(r => r.UserPersonal)
            .NotNull();
        
        RuleFor(r => r.Passport!.Series)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(4)
            .WithMessage("The passport series consists of 4 digits.")
            .When((r ) => r.Passport is not null);
        
        RuleFor(r => r.Passport!.Number)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(6)
            .WithMessage("The passport number consists of 6 digits.")
            .When((r ) => r.Passport is not null);
        
        RuleFor(r => r.Passport!.IssueDate)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Must(issueDate => issueDate < DateTime.Now)
            .WithMessage("The date of issue is less than today's date.")
            .When((r ) => r.Passport is not null);
        
        RuleFor(r => r.Passport!.IssuedBy)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .MaximumLength(200)
            .WithMessage("The string must not be more than 200 characters.")
            .When((r ) => r.Passport is not null);
        
        RuleFor(r => r.Passport!.Registration)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .MaximumLength(200)
            .WithMessage("The string must not be more than 200 characters.")
            .When((r ) => r.Passport is not null);

        RuleFor(r => r.UserPersonal!.Age)
            .Cascade(CascadeMode.Stop)
            .GreaterThanOrEqualTo(21)
            .LessThan(73)
            .WithMessage("You must be at least 21 and not older than 72.")
            .When((r ) => r.UserPersonal is not null);
        
        RuleFor(r => r.UserPersonal!.FirstName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .MaximumLength(50)
            .WithMessage("The string must not be more than 50 characters.")
            .When((r ) => r.UserPersonal is not null);
        
        RuleFor(r => r.UserPersonal!.Surname)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .MaximumLength(50)
            .WithMessage("The string must not be more than 50 characters.")
            .When((r ) => r.UserPersonal is not null);
        
        RuleFor(r => r.UserPersonal!.Patronymic)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .MaximumLength(60)
            .WithMessage("The string must not be more than 50 characters.")
            .When((r ) => r.UserPersonal is not null);
    }
}