// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using FluentAssertions.Common;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Brokers.UserManagement;
using MedMobile.Api.Configurations;
using MedMobile.Api.Services.Doctors;
using MedMobile.Api.Services.Fields;
using MedMobile.Api.Services.Hospitals;
using MedMobile.Api.Services.Persons;
using MedMobile.Api.Services.Sessions;
using MedMobile.Api.Services.TimeLines;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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

            services.ConfigureSwagger(Configuration);

            services.AddTransient<IStorageBroker, StorageBroker>();
            services.AddScoped<IUserManagementBroker, UserManagementBroker>();
            services.AddScoped<IDoctorService, DoctorService>();
            services.AddScoped<IFieldService, FieldService>();
            services.AddScoped<IHospitalService, HospitalService>();
            services.AddScoped<IPersonService, PersonService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<ITimeLineService, TimeLineService>();
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
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
