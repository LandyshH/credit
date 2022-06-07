using credit.Models;
using credit.Models.Enums;

namespace credit.Services;

public static class CalculatePercent
{
    public static double CalculatePercentByPoints(int points)
    {
        var percents = points switch
        {
            >= 80 and < 84  => 30,
            >= 84 and < 88 => 26,
            >= 88 and < 92 => 22,
            >= 92 and < 96 => 19,
            >= 96 and < 100 => 15,
            100 => 12.5,
            _ => 0.0
        };

        return percents;
    }
    
    public static int CalculatePointsByAge(int age, double creditAmount, bool deposit)
    {
        var points = 0;
        if (age is >= 21 and <= 28)
        {
            switch (creditAmount)
            {
                case < 1000000:
                    points += 12;
                    break;
                case >= 1000000 and <= 3000000:
                    points += 9;
                    break;
            }
        }
        else if (age is >= 29 and <= 59)
        {
            points += 14;
        }
        else if (age is >= 60 and <= 72)
        {
            if (deposit)
            {
                points += 8;
            }
        }
        
        return points;
    }

    public static int CalculatePointsByCriminalRecord(bool criminalRecord)
    {
        var points = 0;
        if (criminalRecord)
        {
            points += 15;
        }

        return points;
    }

    public static int CalculatePointsByEmployment(Employment employment, int age)
    {
        var points = 0;
        switch (employment)
        {
            case Employment.Contract:
                points += 14;
                break;
            case Employment.IE:
            case Employment.WithoutContract:
                points += 12;
                break;
            case Employment.Retiree:
            {
                if (age < 70)
                {
                    points += 5;
                }

                break;
            }
        }
        
        return points;
    }

    public static int CalculatePointsByPurpose(Purpose purpose)
    {
        var points = 0;
        switch (purpose)
        {
            case Purpose.Realty:
                points += 8;
                break;
            case Purpose.Recrediting:
                points += 12;
                break;
            case Purpose.ConsumerCredit:
                points += 14;
                break;
        }
        
        return points;
    }

    public static int CalculatePointsByDeposit(Deposit deposit)
    {
        var points = 0;
        if (deposit == Deposit.Realty)
        {
            points += 14;
        }
        else if (deposit == Deposit.Guarantee)
        {
            points += 12;
        }
        else if (deposit == Deposit.CarGreater3Years)
        {
            points += 3;
        }
        else if (deposit == Deposit.CarLess3Years)
        {
            points += 8;
        }
        
        return points;
    }
    
    public static int CalculatePointsByOtherCredits(bool otherCredits, Purpose purpose)
    {
        var points = 0;
        if (!otherCredits && purpose != Purpose.Recrediting)
        {
            points += 15;
        }
        
        return points;
    }
    
    public static int CalculatePointsByCreditSum(double creditSum)
    {
        var points = 0;
        if (creditSum is >= 0 and <= 1000000)
        {
            points += 12;
        }
        else if (creditSum is >= 1000001 and <= 5000000)
        {
            points += 14;
        }
        else if (creditSum is >= 5000001 and <= 10000000)
        {
            points += 8;
        }
        
        return points;
    }
}