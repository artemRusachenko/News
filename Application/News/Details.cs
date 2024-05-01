using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.News
{
    public class Details
    {
        public class Query : IRequest<Domain.News>{
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Domain.News>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Domain.News> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.News.FindAsync(request.Id);
            }
        }
    }
}