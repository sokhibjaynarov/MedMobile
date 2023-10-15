using MedMobile.Api.Services.Fields;
using MedMobile.Api.ViewModels.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FieldsController : RESTFulController
    {
        private readonly IFieldService fieldService;

        public FieldsController(IFieldService fieldService)
        {
            this.fieldService = fieldService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse>> GetFields(string searchText, int skip = 0, int take = 20)
        {
            try
            {
                var result = this.fieldService.GetAllFieldsAsync(searchText, skip, take);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
