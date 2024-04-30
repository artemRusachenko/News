using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class NewsController:BaseApiController
    {
        private readonly DataContext _context;
        public NewsController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet] 
        public async Task<ActionResult<List<News>>> GetNews()
        {
            return await _context.News.ToListAsync();
        }
        
        [HttpGet("{id}")] 
        public async Task<ActionResult<News>> GetNewsById(Guid id)
        {
            return await _context.News.FindAsync(id);
        }

    }
}