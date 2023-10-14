// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Services.Sessions;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Clients;
using System.Threading.Tasks;
using System;
using MedMobile.Api.ViewModels.Sessions;
using RESTFulSense.Controllers;

namespace MedMobile.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SessionController : RESTFulController
    {
        private readonly ISessionService sessionService;

        public SessionController(ISessionService sessionService)
        {
            this.sessionService = sessionService;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> AddSession(SessionForCreateViewModel viewModel)
        {
            try
            {
                var sessionId = await sessionService.AddSessionAsync(viewModel);
                return Ok(sessionId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<bool>> CancelSession(SessionForCancelViewModel viewModel)
        {
            try
            {
                var isSucceed = await sessionService.CancelSessionAsync(viewModel);
                return Ok(isSucceed);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<SessionForGetViewModel>> RetrieveSessionById(Guid sessionId)
        {
            try
            {
                var timeLineId = await sessionService.RetrieveSessionByIdAsync(sessionId);
                return Ok(timeLineId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
