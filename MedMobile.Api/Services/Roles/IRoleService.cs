// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Roles;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Roles
{
    public interface IRoleService
    {
        ValueTask<Role> AddRoleAsync(string roleName);
        ValueTask<Role> RetrieveRoleByIdAsync(Guid roleId);
        IQueryable<Role> RetrieveAllRoles();
    }
}
