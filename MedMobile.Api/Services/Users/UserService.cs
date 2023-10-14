// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Brokers.UserManagement;
using MedMobile.Api.Models.Users;
using MedMobile.Api.ViewModels.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MedMobile.Api.ViewModels.Hospitals;
using MedMobile.Api.ViewModels.Doctors;
using MedMobile.Api.Models.Doctors;

namespace MedMobile.Api.Services.Users
{
    public class UserService : IUserService
    {
        private readonly ILoggingBroker loggingBroker;
        private readonly IUserManagementBroker userManagementBroker;
        private readonly IStorageBroker storageBroker;

        public UserService(ILoggingBroker loggingBroker, IUserManagementBroker userManagementBroker, IStorageBroker storageBroker)
        {
            this.loggingBroker = loggingBroker;
            this.userManagementBroker = userManagementBroker;
            this.storageBroker = storageBroker;
        }

        public async ValueTask<Guid> RegisterPatientAsync(RegisterPatientViewModel viewModel)
        {
            try
            {
                User existUser = await this.userManagementBroker.SelectAllUsers()
                    .FirstOrDefaultAsync(user => user.Email.ToLower() == viewModel.Email.ToLower() ||
                    user.PhoneNumber == viewModel.PhoneNumber);

                if (existUser != null)
                {
                    throw new Exception();
                }

                var user = new User()
                {
                    FirstName = viewModel.FirstName,
                    LastName = viewModel.LastName,
                    FatherName = viewModel.FatherName,
                    PassportNumber = viewModel.PassportNumber,
                    PhoneNumber = viewModel.PhoneNumber,
                    Email = viewModel.Email,
                    UserName = viewModel.Email.ToLower()
                };

                User newUser = await this.userManagementBroker.InsertUserAsync(user, viewModel.Password);
                var roles = new List<string>() { "Patient" };
                await this.userManagementBroker.AddToRolesAsync(newUser, roles);

                return newUser.Id;
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<Guid> AddHospitalAdminAsync(HospitalForCreateViewModel viewModel)
        {
            try
            {
                var existAdmin = await this.userManagementBroker.SelectAllUsers()
                    .FirstOrDefaultAsync(user => user.Email.ToLower() == viewModel.Email.ToLower());
                
                if (existAdmin != null)
                {
                    throw new Exception();
                }

                var admin = new User()
                {
                    Email = viewModel.Admin.Email,
                    UserName = viewModel.Admin.Email.ToLower()
                };

                User newUser = await this.userManagementBroker.InsertUserAsync(admin, viewModel.Admin.Password);
                var roles = new List<string>() { "Admin" };
                await this.userManagementBroker.AddToRolesAsync(newUser, roles);

                return newUser.Id;

            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<Guid> AddDoctorAsync(DoctorForCreateViewModel viewModel)
        {
            try
            {
                var hospital = await this.storageBroker.SelectHospitalByIdAsync(viewModel.HospitalId);

                if (hospital == null)
                {
                    throw new Exception();
                }

                var existDoctor = await this.storageBroker.SelectAllDoctors()
                    .FirstOrDefaultAsync(p => p.HospitalId == viewModel.HospitalId && p.User.Email.ToLower() == viewModel.Email);

                if (existDoctor != null)
                {
                    throw new Exception();
                }

                User existUser = await this.userManagementBroker.SelectAllUsers()
                    .FirstOrDefaultAsync(user => user.Email.ToLower() == viewModel.Email.ToLower() ||
                    user.PhoneNumber == viewModel.PhoneNumber);

                if (existUser != null)
                {
                    throw new Exception();
                }

                var user = new User()
                {
                    FirstName = viewModel.FirstName,
                    LastName = viewModel.LastName,
                    FatherName = viewModel.FatherName,
                    PassportNumber = viewModel.PassportNumber,
                    PhoneNumber = viewModel.PhoneNumber,
                    Email = viewModel.Email,
                    UserName = viewModel.Email.ToLower()
                };

                User newUser = await this.userManagementBroker.InsertUserAsync(user, viewModel.Password);
                var roles = new List<string>() { "Patient" };
                await this.userManagementBroker.AddToRolesAsync(newUser, roles);

                var newDoctor = new Doctor()
                {
                    HospitalId = viewModel.HospitalId,
                    Description = viewModel.Description,
                    UserId = user.Id
                };

                foreach(var fieldId in viewModel.FieldIds)
                {
                    var field = await this.storageBroker.SelectFieldByIdAsync(fieldId);
                    if (field == null)
                    {
                        throw new Exception();
                    }

                    var newField = new DoctorField()
                    {
                        FieldId = fieldId,
                        DoctorId = newDoctor.DoctorId
                    };

                    await this.storageBroker.InsertDoctorFieldAsync(newField);
                }

                await this.storageBroker.InsertDoctorAsync(newDoctor);

                return newDoctor.UserId;
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
