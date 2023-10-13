using MedMobile.Api.Models.Roles;
using MedMobile.Api.Models.Users;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Data
{
    public static class SeedData
    {
        public static async Task SeedRolesAsync(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            //Seed Roles
            await roleManager.CreateAsync(new Role { Name = Roles.SuperAdmin.ToString() });
            await roleManager.CreateAsync(new Role { Name = Roles.Admin.ToString() });
            await roleManager.CreateAsync(new Role { Name = Roles.Doctor.ToString() });
            await roleManager.CreateAsync(new Role { Name = Roles.Patient.ToString() });
        }

        public static async Task SeedSuperAdminsAsync(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            //Seed Super Admins
            var superAdmin = new User
            {
                UserName = "superadmin",
                Email = "superadmin@gmail.com",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };

            if (userManager.Users.All(u => u.Id != superAdmin.Id))
            {
                var user = await userManager.FindByEmailAsync(superAdmin.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(superAdmin, "123");
                    await userManager.AddToRoleAsync(superAdmin, Roles.SuperAdmin.ToString());
                }
            }
        }
    }
}
