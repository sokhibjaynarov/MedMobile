// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Models.TimeLines;
using MedMobile.Api.ViewModels.Sessions;
using MedMobile.Api.StaticFunctions;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.Extensions.Logging.Abstractions;

namespace MedMobile.Api.Services.Sessions
{
    public class SessionService : ISessionService
    {
        private readonly ILoggingBroker loggingBroker;
        private readonly IStorageBroker storageBroker;
        private readonly IHttpContextAccessor httpContextAccessor;

        public SessionService(
            ILoggingBroker loggingBroker, 
            IStorageBroker storageBroker, 
            IHttpContextAccessor httpContextAccessor)
        {
            this.loggingBroker = loggingBroker;
            this.storageBroker = storageBroker;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async ValueTask<Guid> AddSessionAsync(SessionForCreateViewModel viewModel)
        {
            try
            {
                var userId = Guid.Parse(httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                TimeLine timeLine = await storageBroker.SelectTimeLineByIdAsync(viewModel.TimeLineId);
                
                if (timeLine == null)
                {
                    throw new Exception(ResponseMessages.ERROR_NOT_FOUND_DATA);
                }

                var session = new Session
                {
                    TimeLineId = viewModel.TimeLineId,
                    UserId = userId
                };

                Session createdSession = await storageBroker.InsertSessionAsync(session);
                return createdSession.SessionId;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }


        public async ValueTask<bool> CancelSessionAsync(SessionForCancelViewModel viewModel)
        {
            try
            {
                var userId = Guid.Parse(httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                Session session = await storageBroker.SelectSessionByIdAsync(viewModel.SessionId);

                if (session == null)
                {
                    throw new Exception(ResponseMessages.ERROR_NOT_FOUND_DATA);
                }

                TimeLine timeLine = await storageBroker.SelectTimeLineByIdAsync(session.TimeLineId);
                if (session.UserId != userId && timeLine.DoctorUserId != userId)
                {
                    throw new Exception(ResponseMessages.ERROR_NOT_ALLOWED_DATA);
                }

                session.CanceledBy = userId;
                session.ReasonOfCanceling = viewModel.ReasonOfCancelling;
                session.Status = Status.Canceled;
                await storageBroker.UpdateSessionAsync(session);
                return true;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public IQueryable<Session> RetrieveAllSessions()
        {
            try
            {
                return null;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<SessionForGetViewModel> RetrieveSessionByIdAsync(Guid sessionId)
        {
            try
            {
                Session session = await storageBroker.SelectSessionByIdAsync(sessionId);
                TimeLine timeLine = await storageBroker.SelectTimeLineByIdAsync(session.TimeLineId);

                SessionForGetViewModel result = new SessionForGetViewModel
                {
                    SessionId = session.SessionId,
                    StartDateTime = timeLine.StartDateTime,
                    EndDateTime = timeLine.EndDateTime,
                    Status = session.Status,
                    ReasonOfCanceling = session.ReasonOfCanceling,
                    CanceledBy = session.CanceledBy
                };
                return result;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
