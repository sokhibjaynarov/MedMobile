// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Users;

namespace MedMobile.Api.Brokers.UserManagement
{
    public interface IUserManagementBroker
    {
        ValueTask<User> InsertUserAsync(User user, string password);
        IQueryable<User> SelectAllUsers();
        ValueTask<User> SelectUserByIdAsync(Guid userId);
        ValueTask<User> UpdateUserAsync(User user);
        ValueTask<User> DeleteUserAsync(User user);
    }
}
