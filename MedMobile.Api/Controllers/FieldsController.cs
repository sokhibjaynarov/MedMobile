using MedMobile.Api.Services.Fields;
using MedMobile.Api.ViewModels.Pagination;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Controllers
{
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
        public async Task<ValueTask<PaginationResponse>> GetFields(string searchText, int skip = 0, int take = 20)
        {
            try
            {
                var result = this.fieldService.GetAllFields();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
