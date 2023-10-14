// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;

namespace MedMobile.Api.Services.Sessions
{
    public class SessionService : ISessionService
    {
        private readonly IStorageBroker storageBroker;

        public SessionService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        private delegate ValueTask<Session> ReturningSessionFunction();
        private delegate IQueryable<Session> ReturningSessionsFunction();

        private async ValueTask<Session> TryCatch(ReturningSessionFunction returningSessionFunction)
        {
            try
            {
                return await returningSessionFunction();
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
            }
        }

        private IQueryable<Session> TryCatch(ReturningSessionsFunction returningSessionsFunction)
        {
            try
            {
                return returningSessionsFunction();
            }
            catch (SqlException sqlException)
            {
                throw new NotImplementedException();
            }
        }

        public ValueTask<Session> AddSessionAsync(Session session) =>
        TryCatch(async () =>
        {
            return await this.storageBroker.InsertSessionAsync(session);
        });


        public ValueTask<Session> ModifySessionAsync(Session session) =>
            TryCatch(async () =>
            {
                Session maybeSession =
                    await this.storageBroker.SelectSessionByIdAsync(session.SessionId);
                return await storageBroker.UpdateSessionAsync(session);
            });


        public ValueTask<Session> RemoveSessionByIdAsync(Guid sessionId) =>
            TryCatch(async () =>
            {
                Session maybeSession =
                await this.storageBroker.SelectSessionByIdAsync(sessionId);

                return await storageBroker.DeleteSessionAsync(maybeSession);
            });

        public IQueryable<Session> RetrieveAllSessions() =>
            TryCatch(() =>
                 this.storageBroker.SelectAllSessions());

        public ValueTask<Session> RetrieveSessionByIdAsync(Guid sessionId) =>
            TryCatch(async () =>
            {
                Session maybeSession =
                    await storageBroker.SelectSessionByIdAsync(sessionId);
                return maybeSession;
            });
    }
}
