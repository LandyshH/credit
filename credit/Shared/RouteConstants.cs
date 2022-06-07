namespace credit.Shared;

public static class RouteConstants
{
    private const string Prefix = "/api";

    public static class Credit
    {
        public const string Percents = $"{Prefix}/{nameof(Credit)}/{nameof(Percents)}";
    }
}