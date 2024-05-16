// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using AutoMapper;

// namespace Application.News
// {
//     public class CreateNewsDto
//     {
//         public Guid Id { get; set; }
//         public DateTimeOffset Date { get; set; }
//         public string Title { get; set; }
//         public string Description { get; set; }
//         public string Content { get; set; }
//         public Guid CategoryId { get; set; }

//         internal Domain.News ProjectTo<T>(IConfigurationProvider configurationProvider)
//         {
//             throw new NotImplementedException();
//         }
//     }
// }