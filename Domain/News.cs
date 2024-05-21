namespace Domain
{
    public class News
    {
        public Guid Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}