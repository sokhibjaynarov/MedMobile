// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.TimeLines;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial interface IStorageBroker
    {
        ValueTask<TimeLine> InsertTimeLineAsync(TimeLine timeLine);
        IQueryable<TimeLine> SelectAllTimeLines();
        ValueTask<TimeLine> SelectTimeLineByIdAsync(Guid timeLineId);
        ValueTask<TimeLine> UpdateTimeLineAsync(TimeLine timeLine);
        ValueTask<TimeLine> DeleteTimeLineAsync(TimeLine timeLine);
    }
}
