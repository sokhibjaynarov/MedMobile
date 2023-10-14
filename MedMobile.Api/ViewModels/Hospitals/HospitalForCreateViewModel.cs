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

        public HospitalAdminForCreateViewModel Admin { get; set; }
    }
}
