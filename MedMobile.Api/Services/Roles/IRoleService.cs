// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Roles;

namespace MedMobile.Api.Services.Roles
{
    public interface IRoleService
    {
        ValueTask<Role> AddRoleAsync(string roleName);
        ValueTask<Role> RetrieveRoleByIdAsync(Guid roleId);
        IQueryable<Role> RetrieveAllRoles();
    }
}
