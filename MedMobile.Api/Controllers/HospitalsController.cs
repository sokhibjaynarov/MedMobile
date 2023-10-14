using MedMobile.Api.Services.Users;
using MedMobile.Api.ViewModels.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MedMobile.Api.Services.Hospitals;
using MedMobile.Api.ViewModels.Hospitals;
using MedMobile.Api.Models.Doctors;
using MedMobile.Api.Models.Hospitals;

namespace MedMobile.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HospitalsController : RESTFulController
    {
        private readonly IUserService userService;
        private readonly IHospitalService hospitalService;

        public HospitalsController(IUserService userService, IHospitalService hospitalService)
        {
            this.userService = userService;
            this.hospitalService = hospitalService;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> AddHospital(HospitalForCreateViewModel viewModel)
        {
            try
            {
                var userId = await this.hospitalService.AddHospitalAsync(viewModel);

                await this.userService.AddHospitalAdminAsync(viewModel);
                return Ok(userId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<Hospital> GetAllHospitals()
        {
            try
            {
                var hospitals = this.hospitalService.RetrieveAllHospitals();
                return Ok(hospitals);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<Hospital>> GetHospitalById(Guid doctorId)
        {
            try
            {
                var hospital = this.hospitalService.RetrieveHospitalByIdAsync(doctorId);
                return Ok(hospital);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
