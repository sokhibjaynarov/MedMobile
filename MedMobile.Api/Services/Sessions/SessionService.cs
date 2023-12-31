﻿// --------------------------------------------------------------- 
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
using Microsoft.AspNetCore.SignalR;
using MedMobile.Api.Hubs;
using MedMobile.Api.Models.Users;
using Microsoft.AspNetCore.Http;
using MedMobile.Api.ViewModels.Doctors;
using MedMobile.Api.ViewModels.Fields;
using MedMobile.Api.ViewModels.Hospitals;
using MedMobile.Api.ViewModels.Users;

namespace MedMobile.Api.Services.Sessions
{
    public class SessionService : ISessionService
    {
        private readonly ILoggingBroker loggingBroker;
        private readonly IStorageBroker storageBroker;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IHubContext<MessengerHub, IMessengerClient> hubContext;

        public SessionService(
            ILoggingBroker loggingBroker,
            IStorageBroker storageBroker,
            IHttpContextAccessor httpContextAccessor,
            IHubContext<MessengerHub, IMessengerClient> hubContext)
        {
            this.loggingBroker = loggingBroker;
            this.storageBroker = storageBroker;
            this.httpContextAccessor = httpContextAccessor;
            this.hubContext = hubContext;
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

        public async ValueTask<bool> CallUserForSessionAsync(Guid userId, Guid currentUserId)
        {
            try
            {
                var sessions = await this.storageBroker.SelectAllSessions().Where(p => p.Status == Status.Waiting && 
                                ((p.TimeLine.DoctorUserId == currentUserId && p.UserId == userId) ||
                                (p.TimeLine.DoctorUserId == currentUserId && p.UserId == userId))).ToListAsync();

                if (!sessions.Any())
                {
                    return false;
                }

                await this.hubContext.Clients.User(userId.ToString()).OnSessionCall(currentUserId);
                return true;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask AvailableSessionAsync()
        {
            try
            {
                var availableSessions = await this.storageBroker.SelectAllSessions().Include(p => p.TimeLine).Where(p => p.Status == Status.Waiting && 
                                        (p.TimeLine.StartDateTime >= DateTime.UtcNow || p.TimeLine.StartDateTime <= DateTime.UtcNow.AddMinutes(-5))).ToListAsync();

                if (availableSessions.Any())
                {
                    foreach(var availableSession in availableSessions)
                    {
                        await hubContext.Clients.User(availableSession.UserId.ToString())
                            .OnAvailableSession(availableSession.SessionId, availableSession.TimeLine.DoctorUserId);
                        await hubContext.Clients.User(availableSession.TimeLine.DoctorUserId.ToString())
                            .OnAvailableSession(availableSession.SessionId, availableSession.UserId);
                    }
                }
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask EndCallSessionAsync(Guid sessionId)
        {
            try
            {
                var session = await this.storageBroker.SelectSessionByIdAsync(sessionId);

                if (session == null)
                {
                    session.Status = Status.Completed;
                    await this.storageBroker.UpdateSessionAsync(session);
                }
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

                var doctorUserIds = sessionQuery.Select(a => a.TimeLine.DoctorUserId).ToList();
                var doctors = await storageBroker.SelectAllDoctors().Where(a => doctorUserIds.Contains(a.UserId))
                    .Select(a => new DoctorForGetViewModel
                    {
                        DoctorId = a.DoctorId,
                        PasportNumber = a.User.PassportNumber,
                        PhoneNumber = a.User.PhoneNumber,
                        Description = a.Description,
                        User = new UserViewModel
                        {
                            UserId = a.UserId,
                            FirstName = a.User.FirstName,
                            LastName = a.User.LastName,
                            FatherName = a.User.FatherName,
                            Email = a.User.Email
                        },
                        Hospital = new HospitalForGetViewModel
                        {
                            HospitalId = a.HospitalId,
                            Name = a.Hospital.Name,
                            Longitude = a.Hospital.Longitude,
                            Latitude = a.Hospital.Latitude
                        },
                        Fields = a.DoctorFields.Select(d => new FieldForGetViewModel
                        {
                            FieldId = d.FieldId,
                            Name = d.Field.Name,
                            Description = d.Field.Description
                        }).ToList()
                    }).ToListAsync();

                var sessions = await sessionQuery.Select(a => new SessionForGetViewModel
                {
                    SessionId = a.SessionId,
                    StartDateTime = a.TimeLine.StartDateTime,
                    EndDateTime = a.TimeLine.EndDateTime,
                    CanceledBy = a.CanceledBy,
                    ReasonOfCanceling = a.ReasonOfCanceling,
                    Status = a.Status,
                    Patient = new ViewModels.Patients.PatientForGetViewModel
                    {
                        UserId = a.UserId,
                        FirstName = a.User.FirstName,
                        LastName = a.User.LastName,
                        FatherName = a.User.FatherName,
                        Email = a.User.Email,
                        PassportNumber = a.User.PassportNumber,
                        PhoneNumber = a.User.PhoneNumber
                    },
                    //Doctor = doctors.FirstOrDefault(f => f.User.UserId == a.TimeLine.DoctorUserId)
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
