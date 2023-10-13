// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.RoleManagement;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Roles;

namespace MedMobile.Api.Brokers.RoleManagement
{
    public class RoleManagementBroker : IRoleManagementBroker
    {
        private readonly RoleManager<Role> roleManagement;

        public RoleManagementBroker(RoleManager<Role> roleManager)
        {
            this.roleManagement = roleManager;
        }
        public IQueryable<Role> SelectAllRoles() => this.roleManagement.Roles;

        public async ValueTask<Role> SelectRoleByIdAsync(Guid RoleId)
        {
            var broker = new RoleManagementBroker(this.roleManagement);

            return await broker.roleManagement.FindByIdAsync(RoleId.ToString());
        }

        public async ValueTask<Role> InsertRoleAsync(Role Role)
        {
            var broker = new RoleManagementBroker(this.roleManagement);
            await broker.roleManagement.CreateAsync(Role);

            return Role;
        }

        public async ValueTask<Role> UpdateRoleAsync(Role Role)
        {
            var broker = new RoleManagementBroker(this.roleManagement);
            await broker.roleManagement.UpdateAsync(Role);

            return Role;
        }

        public async ValueTask<Role> DeleteRoleAsync(Role Role)
        {
            var broker = new RoleManagementBroker(this.roleManagement);
            await broker.roleManagement.DeleteAsync(Role);

            return Role;
        }
    }
}
