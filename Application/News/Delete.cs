using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.News
{
    public class Delete
    {
        public class Command: IRequest
        {
            public Guid Id { get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
                
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var news = await _context.News.FindAsync(request.Id);

                _context.Remove(news);

                await _context.SaveChangesAsync();
            }
        }
    }
}