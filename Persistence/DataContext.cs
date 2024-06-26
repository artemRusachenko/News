using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, IdentityRole, string>
        //public class DataContext : IdentityDbContext<AppUser>

    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<News> News { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}