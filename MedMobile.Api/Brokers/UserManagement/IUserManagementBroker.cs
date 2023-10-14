// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Brokers.UserManagement
{
    public interface IUserManagementBroker
    {
        ValueTask<User> InsertUserAsync(User user, string password);
        IQueryable<User> SelectAllUsers();
        ValueTask<User> SelectUserByIdAsync(Guid userId);
        ValueTask<User> UpdateUserAsync(User user);
        ValueTask<User> DeleteUserAsync(User user);
        ValueTask<bool> CheckPasswordAsync(User user, string password);
        ValueTask<IList<string>> SelectAllUserRolesAsync(User user);
        ValueTask<User> AddToRolesAsync(User user, List<string> roles);
    }
}
