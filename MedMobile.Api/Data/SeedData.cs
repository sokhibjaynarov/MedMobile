using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Models.Doctors;
using MedMobile.Api.Models.Fields;
using MedMobile.Api.Models.Hospitals;
using MedMobile.Api.Models.Roles;
using MedMobile.Api.Models.Users;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Data
{
    public static class SeedData
    {
        private static Guid SuperAdminId = Guid.Parse("0acgab29-8841-4dce-a579-5f226ad42340");

        private static Guid GovernmentHospitalId = Guid.Parse("0acfab29-8841-4dce-a579-5f226ad42340");
        private static Guid PrivateHospitalId = Guid.Parse("1bcfab29-8841-4dce-a579-5f226ad42340");

        private static Guid GovernmentHospitalAdminId = Guid.Parse("1bcfab29-1234-4dce-a579-5f226ad42340");
        private static Guid PrivateHospitalAdminId = Guid.Parse("1bcfab29-2323-4dce-a579-5f226ad42340");

        private static Guid AllergistFieldId = Guid.Parse("1bcfab29-8841-4dce-a579-5f226ad42240");
        private static Guid AnesthesiologistFieldId = Guid.Parse("1bcfab29-8841-4dce-a779-5f226ad42340");
        private static Guid CardiologistFieldId = Guid.Parse("1bcfab29-8841-4dce-a279-5f226ad42340");

        private static Guid DoctorAllergistId = Guid.Parse("1bcfab30-8841-4dce-a279-5f226ad42340");
        private static Guid DoctorCardiologistId = Guid.Parse("0aafab30-8841-4dce-a279-5f226ad42340");

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
                Id = SuperAdminId,
                UserName = "superadmin@gmail.com",
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

        public static async Task SeedHospitalAdminsAsync(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            var govermentHospitalAdmin = new User()
            {
                UserName = "govadmin@gmail.com",
                Email = "govadmin@gmail.com",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };

            var privateHospitalAdmin = new User()
            {
                UserName = "privateadmin@gmail.com",
                Email = "privateadmin@gmail.com",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };

            if (userManager.Users.All(u => u.Id != govermentHospitalAdmin.Id))
            {
                var user = await userManager.FindByEmailAsync(govermentHospitalAdmin.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(govermentHospitalAdmin, "123");
                    await userManager.AddToRoleAsync(govermentHospitalAdmin, Roles.Admin.ToString());
                }
            }

            if (userManager.Users.All(u => u.Id != privateHospitalAdmin.Id))
            {
                var user = await userManager.FindByEmailAsync(privateHospitalAdmin.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(privateHospitalAdmin, "123");
                    await userManager.AddToRoleAsync(privateHospitalAdmin, Roles.Admin.ToString());
                }
            }
        }

        public static async Task SeedHospitalsAsync(StorageBroker broker)
        {
            var hospitalGovernment = new Hospital()
            {
                HospitalId = GovernmentHospitalId,
                Email = "e-med@gov.uz",
                Location = "Tashkent, Uzbekistan",
                Name = "E-Gov medical",
                PhoneNumber = "+998995551212",
                Description = "Government medical center in Tashkent since 1990.",
                Website = "e-med.gov.uz",
                AdminUserId = GovernmentHospitalAdminId
            };

            var hospitalPrivate = new Hospital()
            {
                HospitalId = PrivateHospitalId,
                Email = "e-med@neutron.uz",
                Location = "Tashkent, Uzbekistan",
                Name = "Neutron medical",
                PhoneNumber = "+998995551212",
                Description = "Neutron medical center in Tashkent since 1990.",
                Website = "e-med.neutron.uz",
                AdminUserId = GovernmentHospitalAdminId
            };

            if (await broker.SelectHospitalByIdAsync(PrivateHospitalId) == null)
            {
                await broker.InsertHospitalAsync(hospitalPrivate);
            }

            if (await broker.SelectHospitalByIdAsync(GovernmentHospitalId) == null)
            {
                await broker.InsertHospitalAsync(hospitalGovernment);
            }
        }

        public static async Task SeedFieldAsync(StorageBroker broker)
        {
            var allergist = new Field()
            {
                FieldId = AllergistFieldId,
                Name = "Allergists/Immunologists",
                Description = "They treat immune system disorders such as asthma, eczema, food allergies, insect sting allergies, and some autoimmune diseases.",
            };

            var anesthesiologist = new Field()
            {
                FieldId = AnesthesiologistFieldId,
                Name = "Anesthesiologists",
                Description = "These doctors give you drugs to numb your pain or to put you under during surgery, childbirth, or other procedures. They monitor your vital signs while you’re under anesthesia.",
            };

            var cardiologist = new Field()
            {
                FieldId = CardiologistFieldId,
                Name = "Cardiologists",
                Description = "They’re experts on the heart and blood vessels. You might see them for heart failure, a heart attack, high blood pressure, or an irregular heartbeat.",
            };

            if (await broker.SelectFieldByIdAsync(AllergistFieldId) == null)
            {
                await broker.InsertFieldAsync(allergist);
            }

            if (await broker.SelectFieldByIdAsync(AnesthesiologistFieldId) == null)
            {
                await broker.InsertFieldAsync(anesthesiologist);
            }

            if (await broker.SelectFieldByIdAsync(CardiologistFieldId) == null)
            {
                await broker.InsertFieldAsync(cardiologist);
            }
        }

        public static async Task SeedHospitalDoctorsAsync(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            var govermentHospitalUserDoctorAllergist = new User()
            {
                UserName = "allergist@gov.uz",
                Email = "allergist@gov.uz",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                FirstName = "Sohib",
                LastName = "Jaynarov",
                FatherName = "Alisher",
                PassportNumber = "AA123131",
                PhoneNumber = "+998995822929"
            };

            var govermentHospitalDoctorAllergist = new Doctor()
            {
                DoctorId = DoctorAllergistId,
                HospitalId = GovernmentHospitalId,
                UserId = govermentHospitalUserDoctorAllergist.Id,
                Description = "12 years ultra pro max Allergist"
            };

            var privateHospitalAdmin = new User()
            {
                UserName = "privateadmin@gmail.com",
                Email = "privateadmin@gmail.com",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };

            //if (userManager.Users.All(u => u.Id != govermentHospitalAdmin.Id))
            //{
            //    var user = await userManager.FindByEmailAsync(govermentHospitalAdmin.Email);
            //    if (user == null)
            //    {
            //        await userManager.CreateAsync(govermentHospitalAdmin, "123");
            //        await userManager.AddToRoleAsync(govermentHospitalAdmin, Roles.Admin.ToString());
            //    }
            //}

            //if (userManager.Users.All(u => u.Id != privateHospitalAdmin.Id))
            //{
            //    var user = await userManager.FindByEmailAsync(privateHospitalAdmin.Email);
            //    if (user == null)
            //    {
            //        await userManager.CreateAsync(privateHospitalAdmin, "123");
            //        await userManager.AddToRoleAsync(privateHospitalAdmin, Roles.Admin.ToString());
            //    }
            //}
        }
    }
}
