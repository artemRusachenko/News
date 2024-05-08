using Application.News;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NewsController:BaseApiController
    {
        [HttpGet] 
        public async Task<ActionResult<List<NewsDto>>> GetNews()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")] 
        public async Task<ActionResult<News>> GetNewsById(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateNews(News news){
            await Mediator.Send(new Create.Command{News=news});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNews(Guid id, News news){
            news.Id = id;
            await Mediator.Send(new Edit.Command{News = news});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews(Guid id){
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }

    }
}