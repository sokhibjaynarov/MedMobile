// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Hubs
{
    public interface IMessengerClient
    {
        Task OnAvailableSession(Guid sessionId, Guid userId);
        Task OnSessionCall(Guid userId);
    }
}
