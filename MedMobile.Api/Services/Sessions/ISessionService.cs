// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Services.Sessions
{
    public interface ISessionService
    {
        ValueTask<Session> AddSessionAsync(Session session);
        IQueryable<Session> RetrieveAllSessions();
        ValueTask<Session> RetrieveSessionByIdAsync(Guid sessionId);
        ValueTask<Session> ModifySessionAsync(Session session);
        ValueTask<Session> RemoveSessionByIdAsync(Guid sessionId);
    }
}
