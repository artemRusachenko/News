using Application.Core;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.News
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreateNewsDto News { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>{
            public CommandValidator()
            {
                RuleFor(x=> x.News).SetValidator(new NewsValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper){
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var newNews = _mapper.Map<Domain.News>(request.News);

                var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == request.News.CategoryId);
                newNews.Category = category;
                _context.News.Add(newNews);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create News");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}