namespace Application.News
{
    public class GetNewsDto
    {
        public Guid Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string CategoryName { get; set; }
    }
}