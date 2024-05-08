using Application.News;
using AutoMapper;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Domain.News, Domain.News>();
            CreateMap<Domain.News, NewsDto>()
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category.Name));
        }
    }
}