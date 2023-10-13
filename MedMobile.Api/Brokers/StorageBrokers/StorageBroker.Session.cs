// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial class StorageBroker
    {
        public DbSet<Session> Sessions { get; set; }
        public async ValueTask<Session> InsertSessionAsync(Session session) =>
            await InsertAsync(session);

        public IQueryable<Session> SelectAllSessions() =>
            SelectAll<Session>();

        public async ValueTask<Session> SelectSessionByIdAsync(Guid sessionId) =>
            await SelectAsync<Session>(sessionId);

        public async ValueTask<Session> UpdateSessionAsync(Session session) =>
            await UpdateAsync<Session>(session);

        public async ValueTask<Session> DeleteSessionAsync(Session session) =>
            await DeleteAsync<Session>(session);
    }
}
