using Application.News;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NewsController:BaseApiController
    {
        [HttpGet] 
        public async Task<IActionResult> GetNews()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [Authorize]
        [HttpGet("{id}")] 
        public async Task<IActionResult> GetNewsById(Guid id)
        {

            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateNews(CreateNewsDto news){
            return HandleResult(await Mediator.Send(new Create.Command{News=news}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNews(Guid id, CreateNewsDto news){
            news.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{News = news}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}