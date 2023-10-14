// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.ViewModels.Users;

namespace MedMobile.Api.ViewModels.Hospitals
{
    public class HospitalForCreateViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public string Location { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string Website { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public string AdminEmail { get; set; }
        public string Password { get; set; }
    }
}
