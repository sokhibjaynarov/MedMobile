// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;

namespace MedMobile.Api.ViewModels.TimeLines
{
    public class TimeLineForRemoveViewModel
    {
        public Guid TimeLineId { get; set; }
        public string ReasonOfCanceling { get; set; }
    }
}
