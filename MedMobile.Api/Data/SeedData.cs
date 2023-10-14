// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Models.Doctors;
using MedMobile.Api.Models.Fields;
using MedMobile.Api.Models.Hospitals;
using MedMobile.Api.Models.Roles;
using MedMobile.Api.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Data
{
    public static class SeedData
    {
        private static Guid SuperAdminId = Guid.Parse("0acfab29-8841-4dce-a579-5f226ad42340");

        private static Guid GovernmentHospitalId = Guid.Parse("cb2df5ab-a35d-469b-be52-4233318bec41");
        private static Guid PrivateHospitalId = Guid.Parse("7f523afc-e76f-427e-b43b-d048cc361e72");

        private static Guid GovernmentHospitalAdminId = Guid.Parse("bfa09273-83df-4140-96ce-800c3b8b92ad");
        private static Guid PrivateHospitalAdminId = Guid.Parse("7f93554e-d58b-4f79-b389-d23751a814d6");

        private static Guid AllergistFieldId = Guid.Parse("c927c079-1e8f-4380-b353-8eff463ff1f7");
        private static Guid AnesthesiologistFieldId = Guid.Parse("37589215-9bfd-4d31-bc6c-9055e874fe2d");
        private static Guid CardiologistFieldId = Guid.Parse("f445e062-6d2d-4795-bd50-964c6bdc383a");

        private static Guid DoctorAllergistId = Guid.Parse("3d4213c3-52bb-42a8-bc32-815d68ad91db");
        private static Guid DoctorCardiologistId = Guid.Parse("b887c208-bdad-4ca4-aa32-11338395fef2");

        private static Guid DoctorAllergistUserId = Guid.Parse("d6f07052-285f-4a03-9650-3728a312f265");
        private static Guid DoctorCardiologistUserId = Guid.Parse("79fd5583-f37c-4033-8418-f1d0717f6775");

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
                    await userManager.CreateAsync(superAdmin, "@Admin123");
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
                    await userManager.CreateAsync(govermentHospitalAdmin, "@Admin123");
                    await userManager.AddToRoleAsync(govermentHospitalAdmin, Roles.Admin.ToString());
                }
            }

            if (userManager.Users.All(u => u.Id != privateHospitalAdmin.Id))
            {
                var user = await userManager.FindByEmailAsync(privateHospitalAdmin.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(privateHospitalAdmin, "@Admin123");
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
                AdminUserId = PrivateHospitalAdminId
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

        public static async Task SeedHospitalDoctorsAsync(UserManager<User> userManager, RoleManager<Role> roleManager, StorageBroker broker)
        {
            var govermentHospitalUserDoctorAllergist = new User()
            {
                Id = DoctorAllergistUserId,
                UserName = "allergist@gov.uz",
                Email = "allergist@gov.uz",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                FirstName = "Sohib",
                LastName = "Jaynarov",
                FatherName = "Alisher",
                PassportNumber = "AA@Admin123131",
                PhoneNumber = "+998995822929"
            };

            var govermentHospitalDoctorAllergist = new Doctor()
            {
                DoctorId = DoctorAllergistId,
                HospitalId = GovernmentHospitalId,
                UserId = DoctorAllergistUserId,
                Description = "12 years ultra pro max Allergist"
            };

            if (userManager.Users.All(u => u.Id != govermentHospitalUserDoctorAllergist.Id))
            {
                var user = await userManager.FindByEmailAsync(govermentHospitalUserDoctorAllergist.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(govermentHospitalUserDoctorAllergist, "@Admin123");
                    await userManager.AddToRoleAsync(govermentHospitalUserDoctorAllergist, Roles.Doctor.ToString());
                }
            }

            if (await broker.SelectDoctorByIdAsync(govermentHospitalDoctorAllergist.DoctorId) == null)
            {
                await broker.InsertDoctorAsync(govermentHospitalDoctorAllergist);
            }

            var privateHospitalUserDoctorCardiologist = new User()
            {
                Id = DoctorCardiologistUserId,
                UserName = "cardiologist@gmail.com",
                Email = "cardiologist@gmail.com",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                FirstName = "Sardor",
                LastName = "To'ymurodov",
                FatherName = "Alisher",
                PassportNumber = "AA1231212",
                PhoneNumber = "+998995822929"
            };

            var privateHospitalDoctorCardiologist = new Doctor()
            {
                DoctorId = DoctorCardiologistId,
                HospitalId = PrivateHospitalId,
                UserId = DoctorCardiologistUserId,
                Description = "12 years ultra pro max Allergist"
            };

            if (userManager.Users.All(u => u.Id != privateHospitalUserDoctorCardiologist.Id))
            {
                var user = await userManager.FindByEmailAsync(privateHospitalUserDoctorCardiologist.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(privateHospitalUserDoctorCardiologist, "@Admin123");
                    await userManager.AddToRoleAsync(privateHospitalUserDoctorCardiologist, Roles.Doctor.ToString());
                }
            }

            if (await broker.SelectDoctorByIdAsync(privateHospitalDoctorCardiologist.DoctorId) == null)
            {
                await broker.InsertDoctorAsync(privateHospitalDoctorCardiologist);
            }

            var govermentAllergistDoctorField = new DoctorField()
            {
                DoctorId = DoctorAllergistId,
                FieldId = AllergistFieldId
            };

            var privateCardiologistDoctorField = new DoctorField()
            {
                DoctorId = DoctorCardiologistId,
                FieldId = CardiologistFieldId
            };

            if (await broker.SelectAllDoctorFields().FirstOrDefaultAsync(p => p.DoctorId == DoctorAllergistId && p.FieldId == AllergistFieldId) == null)
            {
                await broker.InsertDoctorFieldAsync(govermentAllergistDoctorField);
            }

            if (await broker.SelectAllDoctorFields().FirstOrDefaultAsync(p => p.DoctorId == DoctorCardiologistId && p.FieldId == CardiologistFieldId) == null)
            {
                await broker.InsertDoctorFieldAsync(privateCardiologistDoctorField);
            }
        }
    }
}
