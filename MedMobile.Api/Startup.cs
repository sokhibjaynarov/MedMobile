// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using Hangfire;
using Hangfire.SqlServer;
using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Brokers.RoleManagement;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Brokers.UserManagement;
using MedMobile.Api.Configurations;
using MedMobile.Api.Hubs;
using MedMobile.Api.Models.Roles;
using MedMobile.Api.Models.Users;
using MedMobile.Api.Services.Doctors;
using MedMobile.Api.Services.Fields;
using MedMobile.Api.Services.Files;
using MedMobile.Api.Services.Hospitals;
using MedMobile.Api.Services.Identity;
using MedMobile.Api.Services.Roles;
using MedMobile.Api.Services.Sessions;
using MedMobile.Api.Services.TimeLines;
using MedMobile.Api.Services.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MedMobile.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<StorageBroker>();
            AddBrokers(services);
            AddServices(services);
            services.ConfigureSwagger(Configuration);

            services.AddCors(options =>
            {
                options.AddPolicy(name: "_myAllowSpecificOrigins",
                                  builder =>
                                  {
                                      builder.AllowAnyOrigin()
                                               .AllowAnyMethod()
                                               .AllowAnyHeader();
                                  });
            });

            services.AddIdentity<User, Role>()
                    .AddEntityFrameworkStores<StorageBroker>()
                    .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
                options.MaximumReceiveMessageSize = 9223372036854775807;
            })
            .AddMessagePackProtocol();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment environment)
        {
            if (environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();

                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint(
                    url: "/swagger/v1/swagger.json",
                    name: "MedMobile.Api v1");
                });
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("_myAllowSpecificOrigins");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<MessengerHub>("/hubs/messenger");
            });
        }

        private static void AddBrokers(IServiceCollection services)
        {
            services.AddScoped<IStorageBroker, StorageBroker>();
            services.AddScoped<ILoggingBroker, LoggingBroker>();
            services.AddScoped<IUserManagementBroker, UserManagementBroker>();
            services.AddScoped<IRoleManagementBroker, RoleManagementBroker>();
        }

        private static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IDoctorService, DoctorService>();
            services.AddScoped<IFieldService, FieldService>();
            services.AddScoped<IHospitalService, HospitalService>();
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<ITimeLineService, TimeLineService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFileService, FileService>();
        }
    }
}
