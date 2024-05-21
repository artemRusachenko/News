using Application.Core;
using Application.News;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class List
    {
        public class Query : IRequest<Result<List<GetCategoryDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<GetCategoryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper){
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<GetCategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<GetCategoryDto>>.Success( await _context.Categories.ProjectTo<GetCategoryDto>(_mapper.ConfigurationProvider).ToListAsync());
            }
        }
    }
}