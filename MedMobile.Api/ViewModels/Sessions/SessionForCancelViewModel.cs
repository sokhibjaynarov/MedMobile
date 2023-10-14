// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;

namespace MedMobile.Api.ViewModels.Sessions
{
    public class SessionForCancelViewModel
    {
        public Guid SessionId { get; set; }
        public string ReasonOfCancelling { get; set; }
    }
}
