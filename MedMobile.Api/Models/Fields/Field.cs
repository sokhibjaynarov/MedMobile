// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MedMobile.Api.Models.Doctors;

namespace MedMobile.Api.Models.Fields
{
    public class Field
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid FieldId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }


        public virtual DoctorField DoctorField { get; set; }
    }
}
