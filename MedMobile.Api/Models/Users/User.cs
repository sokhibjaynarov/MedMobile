// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using MedMobile.Api.Models.TimeLines;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace MedMobile.Api.Models.Users
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FatherName { get; set; }

        public string PassportNumber { get; set; }


        public virtual List<Session> Sessions { get; set; }

        public virtual List<TimeLine> TimeLines { get; set; }
    }
}
