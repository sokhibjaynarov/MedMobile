﻿// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Users;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Brokers.UserManagement
{
    public class UserManagementBroker : IUserManagementBroker
    {
        private readonly UserManager<User> userManagement;

        public UserManagementBroker(UserManager<User> userManager)
        {
            this.userManagement = userManager;
        }
        public IQueryable<User> SelectAllUsers() => this.userManagement.Users;

        public async ValueTask<User> SelectUserByIdAsync(Guid userId)
        {
            var broker = new UserManagementBroker(this.userManagement);

            return await broker.userManagement.FindByIdAsync(userId.ToString());
        }

        public async ValueTask<User> InsertUserAsync(User user, string password)
        {
            var broker = new UserManagementBroker(this.userManagement);
            await broker.userManagement.CreateAsync(user, password);

            return user;
        }

        public async ValueTask<User> UpdateUserAsync(User user)
        {
            var broker = new UserManagementBroker(this.userManagement);
            await broker.userManagement.UpdateAsync(user);

            return user;
        }

        public async ValueTask<User> DeleteUserAsync(User user)
        {
            var broker = new UserManagementBroker(this.userManagement);
            await broker.userManagement.DeleteAsync(user);

            return user;
        }

        public async ValueTask<bool> CheckPasswordAsync(User user, string password)
            => await this.userManagement.CheckPasswordAsync(user, password);

        public async ValueTask<IList<string>> SelectAllUserRolesAsync(User user)
            => await this.userManagement.GetRolesAsync(user);

        public async ValueTask<User> AddToRolesAsync(User user, List<string> roles)
        {
            var broker = new UserManagementBroker(this.userManagement);
            await broker.userManagement.AddToRolesAsync(user, roles);

            return user;
        }
    }
}
