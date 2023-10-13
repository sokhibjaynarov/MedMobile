﻿// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using MedMobile.Api.Models.Doctors;

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
