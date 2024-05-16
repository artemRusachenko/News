using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Categories;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        [HttpGet] 
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(Guid id){
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}