using MediatR;
using Persistence;

namespace Application.Categories
{
    public class Delete
    {
        public class Command:IRequest{
            public Guid Id;
        }

        public class Handler : IRequestHandler<Command>{
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FindAsync(request.Id);

                _context.Remove(category);

                await _context.SaveChangesAsync();
            }
        }
    }
}