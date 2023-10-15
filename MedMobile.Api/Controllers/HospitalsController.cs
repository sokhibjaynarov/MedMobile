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
using MedMobile.Api.ViewModels.Pagination;
using Microsoft.AspNetCore.Authorization;

namespace MedMobile.Api.Controllers
{
    [Authorize]
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
                var hospitalId = await this.hospitalService.AddHospitalAsync(viewModel);

                viewModel.HospitalId = hospitalId;

                await this.userService.AddHospitalAdminAsync(viewModel);
                return Ok(hospitalId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse>> GetAllHospitals(string searchText, int skip = 0, int take = 20)
        {
            try
            {
                var hospitals = await this.hospitalService.GetAllHospitalsAsync(searchText, skip, take);
                return Ok(hospitals);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<Hospital>> GetHospitalById(Guid hospitalId)
        {
            try
            {
                var hospital = this.hospitalService.GetHospitalByIdAsync(hospitalId);
                return Ok(hospital);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
