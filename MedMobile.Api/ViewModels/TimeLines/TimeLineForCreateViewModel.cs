// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;

namespace MedMobile.Api.ViewModels.TimeLines
{
    public class TimeLineForCreateViewModel
    {
        public Guid DoctorUserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string EventUrl { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
    }
}
