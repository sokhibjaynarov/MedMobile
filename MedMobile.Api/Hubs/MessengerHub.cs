// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Services.Sessions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MedMobile.Api.Hubs
{
    public class MessengerHub : Hub<IMessengerClient>
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ISessionService sessionService;

        public MessengerHub(IHttpContextAccessor httpContextAccessor, ISessionService sessionService)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.sessionService = sessionService;
        }

        public async Task<bool> CallUserForSession(Guid userId, Guid currentUserId)
        {
            return await this.sessionService.CallUserForSessionAsync(userId, currentUserId);
        }
    }
}
