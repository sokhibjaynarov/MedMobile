// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Roles;

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
