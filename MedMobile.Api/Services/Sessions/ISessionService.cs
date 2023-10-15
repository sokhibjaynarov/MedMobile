// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using System.Threading.Tasks;
using System;
using MedMobile.Api.ViewModels.Sessions;
using System.Collections.Generic;
using MedMobile.Api.ViewModels.Pagination;

namespace MedMobile.Api.Services.Sessions
{
    public interface ISessionService
    {
        ValueTask<Guid> AddSessionAsync(SessionForCreateViewModel session);
        ValueTask<bool> CancelSessionAsync(SessionForCancelViewModel viewModel);
        Task<PaginationResponse> GetAllSessionsAsync(List<Guid> doctorIds, List<Guid> userIds, List<Status> statuses, int skip, int take);
        ValueTask<SessionForGetViewModel> GetSessionByIdAsync(Guid sessionId);
        ValueTask<bool> CallUserForSessionAsync(Guid userId);
        ValueTask AvailableSessionAsync();
    }
}
