// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.ComponentModel.DataAnnotations;

namespace MedMobile.Api.ViewModels.Users
{
    public class RegisterPatientViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public string PassportNumber { get; set; }
        public string Email { get; set; }
        [RegularExpression(@"^998[389][012345789][0-9]{7}$", ErrorMessage = "Phone number is not valid")]
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string Password { get; set; }
    }
}
