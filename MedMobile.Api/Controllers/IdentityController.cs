// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Services.Identity;
using MedMobile.Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class IdentityController : RESTFulController
    {
        private readonly IIdentityService identityService;

        public IdentityController(IIdentityService identityService)
        {
            this.identityService = identityService;
        }

        [HttpPost]
        public async Task<ActionResult<GeneratedTokenViewModel>> Login(CreateTokenViewModel createTokenViewModel)
        {
            try
            {
                var token = await this.identityService.GenerateTokenAsync(createTokenViewModel);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
