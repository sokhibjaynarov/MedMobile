using MedMobile.Api.ViewModels.Hospitals;
using MedMobile.Api.ViewModels.Users;
using System;

namespace MedMobile.Api.ViewModels.Doctors
{
    public class DoctorForGetViewModel
    {
        public Guid DoctorId { get; set; }
        public UserViewModel User { get; set; }
        public string PasportNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public HospitalForGetViewModel Hospital { get; set; }
    }
}
