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
using MedMobile.Api.ViewModels.Patients;
using MedMobile.Api.Services.Identity;
using MedMobile.Api.ViewModels.Identity;

namespace MedMobile.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : RESTFulController
    {
        private readonly IIdentityService identityService;
        private readonly IUserService userService;

        public UsersController(IIdentityService identityService, IUserService userService)
        {
            this.identityService = identityService;
            this.userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<PatientForGetViewModel>> RegisterPatient(RegisterPatientViewModel viewModel)
        {
            try
            {
                var user = await this.userService.RegisterPatientAsync(viewModel);

                var viewModelForToken = new CreateTokenViewModel
                {
                    Email = viewModel.Email,
                    Password = viewModel.Password
                };
                var token = await this.identityService.GenerateTokenAsync(viewModelForToken);
                user.Token = token;
                return Ok(user);
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
