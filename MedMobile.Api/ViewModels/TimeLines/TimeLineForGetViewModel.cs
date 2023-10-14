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
        public string Title { get; set; }
        public string Description { get; set; }
        public string EventUrl { get; set; }
        public bool IsBooked { get; set; }
    }
}
