// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using Microsoft.AspNetCore.SignalR;

namespace MedMobile.Api.Hubs
{
    public class MessengerHub : Hub<IMessengerClient>
    {
    }
}
