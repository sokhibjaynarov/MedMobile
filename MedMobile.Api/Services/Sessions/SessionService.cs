// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Sessions;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Models.TimeLines;
using MedMobile.Api.ViewModels.Sessions;
using MedMobile.Api.StaticFunctions;
using System.Collections.Generic;
using MedMobile.Api.ViewModels.Pagination;
using Microsoft.EntityFrameworkCore;

namespace MedMobile.Api.Services.Sessions
{
    public class SessionService : ISessionService
    {
        private readonly ILoggingBroker loggingBroker;
        private readonly IStorageBroker storageBroker;

        public SessionService(
            ILoggingBroker loggingBroker, 
            IStorageBroker storageBroker)
        {
            this.loggingBroker = loggingBroker;
            this.storageBroker = storageBroker;
        }

        public async ValueTask<Guid> AddSessionAsync(SessionForCreateViewModel viewModel)
        {
            try
            {
                TimeLine timeLine = await storageBroker.SelectTimeLineByIdAsync(viewModel.TimeLineId);
                
                if (timeLine == null)
                {
                    throw new Exception(ResponseMessages.ERROR_NOT_FOUND_DATA);
                }

                var session = new Session
                {
                    TimeLineId = viewModel.TimeLineId,
                    UserId = viewModel.UserId
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
                Session session = await storageBroker.SelectSessionByIdAsync(viewModel.SessionId);

                if (session == null)
                {
                    throw new Exception(ResponseMessages.ERROR_NOT_FOUND_DATA);
                }

                TimeLine timeLine = await storageBroker.SelectTimeLineByIdAsync(session.TimeLineId);
                if (session.UserId != viewModel.UserId && timeLine.DoctorUserId != viewModel.UserId)
                {
                    throw new Exception(ResponseMessages.ERROR_NOT_ALLOWED_DATA);
                }

                session.CanceledBy = viewModel.UserId;
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

        public async Task<PaginationResponse> GetAllSessionsAsync(List<Guid> doctorIds, List<Guid> userIds, List<Status> statuses, int skip, int take)
        {
            try
            {
                var sessionQuery = storageBroker.SelectAllSessions();

                if (userIds != null && userIds.Any())
                {
                    sessionQuery = sessionQuery.Where(a => userIds.Contains(a.UserId));
                }

                if (statuses != null && statuses.Any())
                {
                    sessionQuery = sessionQuery.Where(a => statuses.Contains(a.Status));
                }

                var count = sessionQuery.Count();

                var sessions = await sessionQuery.Select(a => new SessionForGetViewModel
                {
                    SessionId = a.SessionId,
                    StartDateTime = a.TimeLine.StartDateTime,
                    EndDateTime = a.TimeLine.EndDateTime,
                    CanceledBy = a.CanceledBy,
                    ReasonOfCanceling = a.ReasonOfCanceling,
                    Status = a.Status
                }).OrderBy(a => a.StartDateTime).Skip(skip).Take(take).ToListAsync();

                var result = new PaginationResponse(sessions, skip, take, count);
                return result;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<SessionForGetViewModel> GetSessionByIdAsync(Guid sessionId)
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
