// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.ViewModels.Users;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Users
{
    public class UserService : IUserService
    {
        public ValueTask<Guid> RegisterPatientAsync(RegisterPatientViewModel registerPatientViewModel)
        {
            throw new NotImplementedException();
        }
    }
}
