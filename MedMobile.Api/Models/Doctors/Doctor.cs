// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MedMobile.Api.Models.Hospitals;

namespace MedMobile.Api.Models.Doctors
{
    public class Doctor
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DoctorId { get; set; }

        [ForeignKey(nameof(Hospital))]
        public Guid HospitalId { get; set; }
        public string Description { get; set; }


        public virtual Hospital Hospital { get; set; }
        public virtual DoctorField DoctorField { get; set; }
    }
}
