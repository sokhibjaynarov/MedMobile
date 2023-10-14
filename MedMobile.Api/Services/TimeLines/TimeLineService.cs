﻿// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Models.Sessions;
using MedMobile.Api.Models.TimeLines;
using MedMobile.Api.StaticFunctions;
using MedMobile.Api.ViewModels.TimeLines;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.TimeLines
{
    public class TimeLineService : ITimeLineService
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ILoggingBroker loggingBroker;
        private readonly IStorageBroker storageBroker;

        public TimeLineService(ILoggingBroker loggingBroker, IStorageBroker storageBroker)
        {
            this.loggingBroker = loggingBroker;
            this.storageBroker = storageBroker;
        }

        public async ValueTask<TimeLine> AddTimeLineAsync(TimeLineForCreateViewModel viewModel)
        {
            try
            {
                string doctorUserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                bool isTimeLineExists = storageBroker.SelectAllTimeLines()
                    .Any(t => t.StartDateTime == t.StartDateTime && t.DoctorUserId.ToString() == doctorUserId);

                if (isTimeLineExists)
                {
                    throw new Exception(ResponseMessages.ERROR_EXIST_DATA);
                }

                if (viewModel.DoctorUserId == Guid.Empty || viewModel.StartDateTime < DateTime.UtcNow)
                {
                    throw new Exception(ResponseMessages.ERROR_INVALID_DATA);
                }

                TimeLine timeLine = new TimeLine
                {
                    DoctorUserId = viewModel.DoctorUserId,
                    StartDateTime = viewModel.StartDateTime,
                    EndDateTime = viewModel.EndDateTime ?? viewModel.StartDateTime.AddMinutes(30)
                };

                return await storageBroker.InsertTimeLineAsync(timeLine);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<bool> RemoveTimeLineByIdAsync(TimeLineForRemoveViewModel viewModel)
        {
            try
            {
                string doctorUserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(doctorUserId))
                {
                    throw new Exception(ResponseMessages.ERROR_INVALID_DATA);
                }

                if (string.IsNullOrEmpty(viewModel.ReasonOfRejection))
                {
                    throw new Exception(ResponseMessages.ERROR_INVALID_DATA);
                }

                TimeLine timeLine = await storageBroker.SelectTimeLineByIdAsync(viewModel.TimeLineId);
                if (timeLine == null)
                {
                    throw new Exception(ResponseMessages.ERROR_NOT_FOUND_DATA);
                }

                if (timeLine.DoctorUserId.ToString() != doctorUserId)
                {
                    throw new Exception(ResponseMessages.ERROR_NOT_ALLOWED_DATA);
                }

                Session session = await storageBroker.SelectAllSessions()
                    .Where(s => s.TimeLineId == timeLine.TimeLineId).FirstOrDefaultAsync();

                if (session != null)
                {
                    session.RejectedBy = Guid.Parse(doctorUserId);
                    session.Status = Status.Rejected;
                    session.ReasonOfRejection = viewModel.ReasonOfRejection;
                }

                await storageBroker.DeleteTimeLineAsync(timeLine);
                return true;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async Task<IEnumerable<TimeLineForGetViewModel>> RetrieveDoctorTimeLines(Guid doctorUserId, DateTime? fromDateTime, DateTime? toDateTime)
        {
            try
            {
                IQueryable<TimeLine> timeLineQuery = storageBroker.SelectAllTimeLines().Where(a => a.DoctorUserId == doctorUserId);

                if (fromDateTime != null)
                {
                    timeLineQuery = timeLineQuery.Where(a => a.StartDateTime >= fromDateTime);
                }
                if (toDateTime != null)
                {
                    timeLineQuery = timeLineQuery.Where(a => a.EndDateTime <= toDateTime);
                }

                var timeLines = await timeLineQuery.Select(a => new TimeLineForGetViewModel
                {
                    TimeLineId = a.TimeLineId,
                    StartDateTime = a.StartDateTime,
                    EndDateTime = a.EndDateTime,
                    IsBooked = storageBroker.SelectAllSessions()
                                .Any(s => s.TimeLineId == a.TimeLineId && (s.Status == Status.Waiting || s.Status == Status.Completed))
                }).ToListAsync();

                return timeLines;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
