namespace credit.Models;

public class Passport
{
    public string? Series { get; set; }
    public string? Number { get; set; }
    public string? IssuedBy { get; set; }
    public DateTime IssueDate { get; set; }
    public string? Registration { get; set; }
}
