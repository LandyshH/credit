using credit.Models;
using credit.Models.Enums;

namespace credit.Endpoints.Percent;

public class Request
{
    public UserPersonal? UserPersonal { get; set; }
    public Passport? Passport { get; set; }
    public bool CriminalRecord { get; set; }
    public double CreditSum { get; set; }
    public Purpose Purpose { get; set; }
    public Employment Employment { get; set; }
    public bool OtherCredits { get; set; }
    public Deposit Deposit { get; set; }
}