namespace Domain
{
    public class News
    {
        public Guid Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        
    }
}