// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Hospitals;
using MedMobile.Api.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedMobile.Api.Models.Doctors
{
    public class Doctor
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DoctorId { get; set; }

        [ForeignKey(nameof(Hospital))]
        public Guid HospitalId { get; set; }
        public string Description { get; set; }
        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        public virtual Hospital Hospital { get; set; }
        public virtual List<DoctorField> DoctorFields { get; set; }
        public virtual User User { get; set; }
    }
}
