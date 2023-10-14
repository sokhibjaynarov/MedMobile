// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Users;
using MedMobile.Api.ViewModels.Users;
using System;

namespace MedMobile.Api.ViewModels.Identity
{
    public class GeneratedTokenViewModel
    {
        public string Token { get; set; }
        public DateTime ExpirationData { get; set; }
        public UserForLoginResponseViewModel User { get; set; }
    }
}
