using System;

namespace MedMobile.Api.ViewModels.Hospitals
{
    public class HospitalForGetViewModel
    {
        public Guid HospitalId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string Website { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
