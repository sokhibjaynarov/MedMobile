// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.TimeLines;
using MedMobile.Api.Models.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedMobile.Api.Models.Sessions
{
    public class Session
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SessionId { get; set; }

        [ForeignKey(nameof(TimeLine))]
        public Guid TimeLineId { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        public Guid? RejectedBy { get; set; }

        public Status Status { get; set; } = Status.Waiting;


        public virtual User User { get; set; }

        public virtual TimeLine TimeLine { get; set; }
    }
}
