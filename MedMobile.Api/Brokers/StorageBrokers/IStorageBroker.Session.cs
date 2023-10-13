// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial interface IStorageBroker
    {
        ValueTask<Session> InsertSessionAsync(Session session);
        IQueryable<Session> SelectAllSessions();
        ValueTask<Session> SelectSessionByIdAsync(Guid sessionId);
        ValueTask<Session> UpdateSessionAsync(Session session);
        ValueTask<Session> DeleteSessionAsync(Session session);
    }
}
