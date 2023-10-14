// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.ViewModels.Users;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Users
{
    public interface IUserService
    {
        ValueTask<Guid> RegisterPatientAsync(RegisterPatientViewModel registerPatientViewModel);
    }
}
