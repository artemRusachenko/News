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
    }
}