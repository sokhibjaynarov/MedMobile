﻿// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.ComponentModel.DataAnnotations;

namespace MedMobile.Api.ViewModels.Identity
{
    public class CreateTokenViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
