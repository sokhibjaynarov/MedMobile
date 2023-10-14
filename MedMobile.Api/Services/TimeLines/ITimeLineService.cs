// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.TimeLines;
using MedMobile.Api.ViewModels.TimeLines;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.TimeLines
{
    public interface ITimeLineService
    {
        ValueTask<TimeLine> AddTimeLineAsync(TimeLineForCreateViewModel viewModel);
        IQueryable<TimeLine> RetrieveAllTimeLines();
        ValueTask<TimeLine> RetrieveTimeLineByIdAsync(Guid timeLineId);
        ValueTask<TimeLine> ModifyTimeLineAsync(TimeLine timeLine);
        ValueTask<TimeLine> RemoveTimeLineByIdAsync(Guid timeLineId);
    }
}
