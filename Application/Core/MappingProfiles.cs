using Application.News;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Domain.News, Domain.News>();
            CreateMap<Domain.News, GetNewsDto>()
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category.Name));
            CreateMap<CreateNewsDto, Domain.News>();
            CreateMap<Category, GetCategoryDto>();
        }
    }
}