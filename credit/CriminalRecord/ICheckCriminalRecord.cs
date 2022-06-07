using credit.Models;

namespace credit.CriminalRecord;

public interface ICheckCriminalRecord
{
    Task<bool> IsCertificateOfNoCriminalRecord(Passport passport);
}