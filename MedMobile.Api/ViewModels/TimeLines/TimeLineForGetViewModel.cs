// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;

namespace MedMobile.Api.ViewModels.TimeLines
{
    public class TimeLineForGetViewModel
    {
        public Guid TimeLineId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public Guid DoctorUserId { get; set; }
        public bool IsBooked { get; set; }
    }
}
