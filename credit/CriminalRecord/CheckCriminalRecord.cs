using credit.Models;

namespace credit.CriminalRecord;

public class CheckCriminalRecord : ICheckCriminalRecord
{
    public async Task<bool> IsCertificateOfNoCriminalRecord(Passport passport)
    {
        var rnd = new Random();
        var value = rnd.Next(0, 5);
        return await Task.FromResult(value != 1);
    }
}