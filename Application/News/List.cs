using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.News
{
    public class List
    {
        public class Query : IRequest<List<Domain.News>>{
            
        }

        public class Handler : IRequestHandler<Query, List<Domain.News>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
                
            }

            public async Task<List<Domain.News>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.News.ToListAsync();
            }
        }
    }
}