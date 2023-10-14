// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace MedMobile.Api.ViewModels.Doctors
{
    public class DoctorForCreateViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string PassportNumber { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string Password { get; set; }
        public Guid HospitalId { get; set; }
        public List<Guid> FieldIds { get; set; }
    }
}
