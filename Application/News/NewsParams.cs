namespace Application.News
{
    public class NewsParams
    {
        public Guid? CategoryId { get; set; } = null;

        public string Text { get; set; } = null;
    }
}