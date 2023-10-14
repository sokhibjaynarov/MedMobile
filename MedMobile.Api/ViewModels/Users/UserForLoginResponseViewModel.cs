using System;

namespace MedMobile.Api.ViewModels.Users
{
    public class UserForLoginResponseViewModel
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FatherName { get; set; }

        public string PassportNumber { get; set; }
    }
}
