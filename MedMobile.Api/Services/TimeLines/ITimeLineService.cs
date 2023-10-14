// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.TimeLines;
using MedMobile.Api.ViewModels.TimeLines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.TimeLines
{
    public interface ITimeLineService
    {
        ValueTask<TimeLine> AddTimeLineAsync(TimeLineForCreateViewModel viewModel);
        Task<IEnumerable<TimeLineForGetViewModel>> RetrieveDoctorTimeLines(Guid doctorUserId, DateTime? fromDateTime, DateTime? toDateTime);
        ValueTask<bool> RemoveTimeLineByIdAsync(TimeLineForRemoveViewModel timeLineId);
    }
}
