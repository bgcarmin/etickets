using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class IdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Armin",
                    Email = "armin@test.com",
                    UserName = "armin@test.com",
                    Address = new Address
                    {
                        FirstName = "Armin",
                        LastName = "Armin",
                        Country = "BiH",
                        ZipCode = "20000",
                        City = "Travnik",
                        Street = "Travnicka Ulica"
                    }
                };

                await userManager.CreateAsync(user, "Pa$sw0rd");
            }
        }
    }
}