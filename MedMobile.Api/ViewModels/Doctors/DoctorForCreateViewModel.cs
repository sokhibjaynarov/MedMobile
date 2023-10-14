// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace MedMobile.Api.ViewModels.Doctors
{
    public class DoctorForCreateViewModel
    {
        public Guid HospitalId { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public List<Guid> FieldIds { get; set; }
    }
}
