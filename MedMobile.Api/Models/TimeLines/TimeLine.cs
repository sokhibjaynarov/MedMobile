// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedMobile.Api.Models.TimeLines
{
    public class TimeLine
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid TimeLineId { get; set; }

        [ForeignKey(nameof(User))]
        public Guid DoctorUserId { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }


        public virtual User DoctorUser { get; set; }
    }
}
