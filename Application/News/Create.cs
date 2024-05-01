using MediatR;
using Persistence;

namespace Application.News
{
    public class Create
    {
        public class Command : IRequest
        {
            public Domain.News News { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;

            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.News.Add(request.News);

                await _context.SaveChangesAsync();
            }
        }
    }
}