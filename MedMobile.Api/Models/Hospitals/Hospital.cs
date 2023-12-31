﻿// --------------------------------------------------------------- 
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

        public string Name { get; set; }

        public string Description { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string Website { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public Guid AdminUserId { get; set; }

        public virtual List<Doctor> Doctors { get; set; }
    }
}
