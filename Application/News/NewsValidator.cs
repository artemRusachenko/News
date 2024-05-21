using FluentValidation;

namespace Application.News
{
    public class NewsValidator : AbstractValidator<CreateNewsDto>
    {
        public NewsValidator()
        {
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.CategoryId).NotEmpty();
        }
    }
}