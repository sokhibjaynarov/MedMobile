// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedMobile.Api.Models.Sessions
{
    public class Session
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SessionId { get; set; }

        //[ForeignKey(nameof(TimeLine))]
        public Guid TimeLineId { get; set; }

        //[ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        public Guid? CanceledBy { get; set; }

        public string ReasonOfCanceling { get; set; }

        public Status Status { get; set; } = Status.Waiting;


        //public virtual User User { get; set; }

        //public virtual TimeLine TimeLine { get; set; }
    }
}
