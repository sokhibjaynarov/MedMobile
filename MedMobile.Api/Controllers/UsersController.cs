// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Services.Users;
using MedMobile.Api.ViewModels.Users;
using MedMobile.Api.ViewModels.Doctors;
using Microsoft.AspNetCore.Authorization;

namespace MedMobile.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : RESTFulController
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Guid>> RegisterPatient(RegisterPatientViewModel viewModel)
        {
            try
            {
                var userId = await this.userService.RegisterPatientAsync(viewModel);
                return Ok(userId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> AddDoctor(DoctorForCreateViewModel viewModel)
        {
            try
            {
                var doctorId = await this.userService.AddDoctorAsync(viewModel);
                return Ok(doctorId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
