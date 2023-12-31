﻿// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.ViewModels.Identity;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Identity
{
    public interface IIdentityService
    {
        ValueTask<GeneratedTokenViewModel> GenerateTokenAsync(CreateTokenViewModel createTokenView);
    }
}
