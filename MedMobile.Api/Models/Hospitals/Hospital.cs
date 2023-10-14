// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Doctors;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedMobile.Api.Models.Hospitals
{
    public class Hospital
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid HospitalId { get; set; }

        public string Description { get; set; }

        public string Location { get; set; }

        public string Number { get; set; }

        public string Email { get; set; }

        public string Website { get; set; }


        public virtual List<Doctor> Doctors { get; set; }
    }
}
