// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Services.TimeLines;
using MedMobile.Api.ViewModels.TimeLines;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace MedMobile.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TimeLineController: RESTFulController
    {
        private readonly ITimeLineService timeLineService;

        public TimeLineController(ITimeLineService timeLineService)
        {
            this.timeLineService = timeLineService;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> AddTimeLine(TimeLineForCreateViewModel viewModel)
        {
            try
            {
                var timeLineId = await timeLineService.AddTimeLineAsync(viewModel);
                return Ok(timeLineId);
            }
            catch (Exception ex)    
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<bool>> RemoveTimeLineById(TimeLineForRemoveViewModel viewModel)
        {
            try
            {
                var isSucceed = await timeLineService.RemoveTimeLineByIdAsync(viewModel);
                return Ok(isSucceed);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimeLineForGetViewModel>>> GetDoctorTimeLines(
            Guid doctorUserId, DateTime? fromDateTime, DateTime? toDateTime)
        {
            try
            {
                var timeLines = await timeLineService.GetDoctorTimeLinesAsync(doctorUserId, fromDateTime, toDateTime);
                return Ok(timeLines);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
