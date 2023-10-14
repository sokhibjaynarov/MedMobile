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
using System.Threading.Tasks;

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
                    Email = viewModel.Email
                };

                User newUser = await this.userManagementBroker.InsertUserAsync(user, viewModel.PassportNumber);

                return newUser.Id;
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
