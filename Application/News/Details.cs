using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.News
{
    public class Details
    {
        public class Query : IRequest<Result<GetNewsDto>>{
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<GetNewsDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<GetNewsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var newsItem = await _context.News
                    .Where(x => x.Id == request.Id) // Or whatever condition you need
                    .ProjectTo<GetNewsDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(cancellationToken);

                return Result<GetNewsDto>.Success(newsItem);
            }
        }
    }
}