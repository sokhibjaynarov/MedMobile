// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using MedMobile.Api.ViewModels.Doctors;
using MedMobile.Api.ViewModels.Patients;
using System;

namespace MedMobile.Api.ViewModels.Sessions
{
    public class SessionForGetViewModel
    {
        public Guid SessionId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string ReasonOfCanceling { get; set; }
        public Guid? CanceledBy { get; set; }
        public Status Status { get; set; }
        public DoctorForGetViewModel Doctor { get; set; }
        public PatientForGetViewModel Patient { get; set; }
    }
}
