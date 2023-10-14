// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Brokers.UserManagement;
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

        public async ValueTask<Guid> RegisterPatientAsync(RegisterPatientViewModel registerPatientViewModel)
        {
            try
            {
                var existUser = await this.userManagementBroker.SelectAllUsers()
                    .FirstOrDefaultAsync(user => user.Email.ToLower() == registerPatientViewModel.Email.ToLower() ||
                    user.PhoneNumber == registerPatientViewModel.PhoneNumber);

                if (existUser != null)
                {
                    throw new Exception();
                }

                return Guid.Empty;
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
