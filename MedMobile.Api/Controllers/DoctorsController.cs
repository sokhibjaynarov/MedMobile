using MedMobile.Api.Services.Doctors;
using MedMobile.Api.ViewModels.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Doctors;

namespace MedMobile.Api.Controllers
{
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
        public ActionResult<Doctor> GetAllDoctors()
        {
            try
            {
                var doctors = this.doctorService.GetAllDoctors();
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
