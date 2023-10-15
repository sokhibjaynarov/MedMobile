using MedMobile.Api.Services.Doctors;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Doctors;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace MedMobile.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DoctorsController : RESTFulController
    {
        private readonly IDoctorService doctorService;

        public DoctorsController(IDoctorService doctorService)
        {
            this.doctorService = doctorService;
        }

        [HttpGet]
        public ActionResult<Doctor> GetAllDoctors([FromQuery]List<Guid> fieldIds, Guid? hospitalId)
        {
            try
            {
                var doctors = this.doctorService.GetAllDoctorsAsync(hospitalId, fieldIds);
                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<Doctor>> GetDoctorById(Guid doctorId)
        {
            try
            {
                var doctor = this.doctorService.GetDoctorByIdAsync(doctorId);
                return Ok(doctor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
