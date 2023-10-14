﻿// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.TimeLines;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Services.TimeLines
{
    public interface ITimeLineService
    {
        ValueTask<TimeLine> AddTimeLineAsync(TimeLine timeLine);
        IQueryable<TimeLine> RetrieveAllTimeLines();
        ValueTask<TimeLine> RetrieveTimeLineByIdAsync(Guid timeLineId);
        ValueTask<TimeLine> ModifyTimeLineAsync(TimeLine timeLine);
        ValueTask<TimeLine> RemoveTimeLineByIdAsync(Guid timeLineId);
    }
}
