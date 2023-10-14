// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;

namespace MedMobile.Api.ViewModels.TimeLines
{
    public class TimeLineForCreateViewModel
    {
        public Guid DoctorUserId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
    }
}
