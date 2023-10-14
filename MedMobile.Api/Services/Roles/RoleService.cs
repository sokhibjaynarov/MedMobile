// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Brokers.RoleManagement;
using MedMobile.Api.Models.Roles;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Roles
{
    public class RoleService : IRoleService
    {
        private readonly ILoggingBroker loggingBroker;
        private readonly IRoleManagementBroker roleManagementBroker;

        public RoleService(ILoggingBroker loggingBroker, IRoleManagementBroker roleManagementBroker)
        {
            this.loggingBroker = loggingBroker;
            this.roleManagementBroker = roleManagementBroker;
        }

        public async ValueTask<Role> AddRoleAsync(string roleName)
        {
            try
            {
                if (!string.IsNullOrEmpty(roleName))
                {
                    var role = new Role();
                    role.Name = roleName.Trim();

                    return await this.roleManagementBroker.InsertRoleAsync(role);
                }

                throw new Exception();
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }

        public IQueryable<Role> GetAllRoles()
        {
            try
            {
                return this.roleManagementBroker.SelectAllRoles();
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<Role> GetRoleByIdAsync(Guid roleId)
        {
            try
            {
                Role role = await this.roleManagementBroker.SelectRoleByIdAsync(roleId);

                if (role == null)
                {
                    throw new Exception();
                }

                return role;
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
