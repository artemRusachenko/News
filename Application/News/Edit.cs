using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.News
{
    public class Edit
    {
        public class Command:IRequest
        {
            public Domain.News News{ get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var news = await _context.News.FindAsync(request.News.Id);

                _mapper.Map(request.News, news);

                await _context.SaveChangesAsync();
            }
        }
    }
}