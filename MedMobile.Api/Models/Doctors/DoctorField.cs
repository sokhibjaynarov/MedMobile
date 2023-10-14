// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Fields;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedMobile.Api.Models.Doctors
{
    public class DoctorField
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DoctorFieldId { get; set; }

        [ForeignKey(nameof(Doctor))]
        public Guid DoctorId { get; set; }

        [ForeignKey(nameof(Field))]
        public Guid FieldId { get; set; }

        public virtual Field Field { get; set; }

        public virtual Doctor Doctor { get; set; }
    }
}
