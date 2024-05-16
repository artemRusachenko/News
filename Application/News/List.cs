using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.News
{
    public class List
    {
        public class Query : IRequest<Result<List<GetNewsDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<GetNewsDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<GetNewsDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<GetNewsDto>>.Success( await _context.News.ProjectTo<GetNewsDto>(_mapper.ConfigurationProvider).ToListAsync());
            }
        }
    }
}