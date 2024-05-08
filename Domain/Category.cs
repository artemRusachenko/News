namespace Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<News> News { get; set; } = new List<News>();
    }
}