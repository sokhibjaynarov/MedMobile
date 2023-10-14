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
using MedMobile.Api.Models.Sessions;
using System.Collections.Generic;
using MedMobile.Api.ViewModels.Pagination;

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
        public async Task<ActionResult<SessionForGetViewModel>> GetSessionById(Guid sessionId)
        {
            try
            {
                var timeLineId = await sessionService.GetSessionByIdAsync(sessionId);
                return Ok(timeLineId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse>> GetAllSessions(List<Guid> doctorIds, List<Guid> userIds, List<Status> statuses, int skip, int take)
        {
            try
            {
                var sessions = await sessionService.GetAllSessionsAsync(doctorIds, userIds, statuses, skip, take);
                return Ok(sessions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
