using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any()){
                var users = new List<AppUser>{
                    new AppUser{DisplayName ="Artem", UserName="artem", Email="artemrusachenko@gmail.com"},
                    new AppUser{DisplayName ="Anna", UserName="anna", Email="anna@gmail.com"},
                    new AppUser{DisplayName ="Anton", UserName="anton", Email="anton@gmail.com"}
                };
                foreach( var user in users){
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            

            if (context.News.Any() && context.Categories.Any()) return;
            
            var categories = new List<Category>{
                new Category{
                    Name="Sport",
                },
                new Category{
                    Name="Politics",
                },
                new Category{
                    Name="Finance",
                },
            };

            var news = new List<News>
            {
                new News
                {
                    Title = "News 1",
                    Date = DateTimeOffset.UtcNow.AddMonths(-2).AddHours(3),
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
                    Content = @"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                     Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                      Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                       Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                        imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                         Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                          porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                           feugiat a,",
                    Category = categories[0],
                },
                new News
                {
                    Title = "News 2",
                    Date = DateTimeOffset.UtcNow.AddMonths(-1).AddHours(20).AddDays(-2),
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
                    Content = @"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                     Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                      Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                       Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                        imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                         Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                          porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                           feugiat a,",
                    Category = categories[1],

                },
                new News
                {
                    Title = "News 3",
                    Date = DateTimeOffset.UtcNow.AddDays(-10).AddHours(6),
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
                    Content = @"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                                imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                                porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                                feugiat a,",
                    Category = categories[2],

                },
                new News
                {
                    Title = "News 4",
                    Date = DateTimeOffset.UtcNow.AddDays(-5).AddHours(-2),
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
                    Content = @"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                                imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                                porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                                feugiat a,",
                    Category = categories[1],

                },new News
                {
                    Title = "News 5",
                    Date = DateTimeOffset.UtcNow.AddMonths(-1).AddHours(7),
                    Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
                    Content = @"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                     Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                      Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                       Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                        imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                         Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                          porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                           feugiat a,",
                    Category = categories[0],
                }
            };

            await context.News.AddRangeAsync(news);
            await context.SaveChangesAsync();
        }
    }
}