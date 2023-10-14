// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.ViewModels.Sessions;

namespace MedMobile.Api.Services.Sessions
{
    public interface ISessionService
    {
        ValueTask<Guid> AddSessionAsync(SessionForCreateViewModel session);
        ValueTask<bool> CancelSessionAsync(SessionForCancelViewModel viewModel);
        IQueryable<Session> RetrieveAllSessions();
        ValueTask<SessionForGetViewModel> RetrieveSessionByIdAsync(Guid sessionId);
    }
}
