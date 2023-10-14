// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Data;
using MedMobile.Api.Models.Roles;
using MedMobile.Api.Models.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var loggerFactory = services.GetRequiredService<ILoggerFactory>();
                try
                {
                    var context = services.GetRequiredService<StorageBroker>();
                    var userManager = services.GetRequiredService<UserManager<User>>();
                    var roleManager = services.GetRequiredService<RoleManager<Role>>();
                    await SeedData.SeedRolesAsync(userManager, roleManager);
                    await SeedData.SeedSuperAdminsAsync(userManager, roleManager);
                    await SeedData.SeedHospitalAdminsAsync(userManager, roleManager);
                    await SeedData.SeedHospitalsAsync(context);
                    await SeedData.SeedFieldAsync(context);
                    await SeedData.SeedHospitalDoctorsAsync(userManager, roleManager, context);
                }
                catch (Exception ex)
                {
                    var logger = loggerFactory.CreateLogger<Program>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                    webBuilder.UseStartup<Startup>().UseUrls("http://0.0.0.0:5000", "https://0.0.0.0:5001"));
        }
    }
}
