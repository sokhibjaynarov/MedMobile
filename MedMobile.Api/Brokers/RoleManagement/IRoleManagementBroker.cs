// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Roles;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Brokers.RoleManagement
{
    public interface IRoleManagementBroker
    {
        ValueTask<Role> InsertRoleAsync(Role role);
        IQueryable<Role> SelectAllRoles();
        ValueTask<Role> SelectRoleByIdAsync(Guid roleId);
        ValueTask<Role> UpdateRoleAsync(Role role);
        ValueTask<Role> DeleteRoleAsync(Role role);
    }
}
