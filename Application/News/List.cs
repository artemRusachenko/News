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
        public class Query : IRequest<Result<List<GetNewsDto>>>{
            public NewsParams Params { get; set; }
        }

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
                var news = _context.News.AsQueryable();

                if (request.Params.CategoryId != null)
                {
                    news = news.Where(n => n.CategoryId == request.Params.CategoryId);
                }

                if (!string.IsNullOrWhiteSpace(request.Params.Text))
                {
                    news = news.Where(n => n.Content.Contains(request.Params.Text.Trim()));
                }

                var newsDtos = await news
                    .ProjectTo<GetNewsDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<GetNewsDto>>.Success(newsDtos);
            }
        }
    }
}