using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.News
{
    public class List
    {
        public class Query : IRequest<List<NewsDto>>{}

        public class Handler : IRequestHandler<Query, List<NewsDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<NewsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.News.ProjectTo<NewsDto>(_mapper.ConfigurationProvider).ToListAsync();
            }
        }
    }
}