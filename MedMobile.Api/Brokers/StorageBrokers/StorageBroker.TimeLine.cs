// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.TimeLines;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial class StorageBroker
    {
        public DbSet<TimeLine> TimeLines { get; set; }
        public async ValueTask<TimeLine> InsertTimeLineAsync(TimeLine timeLine) =>
            await InsertAsync(timeLine);

        public IQueryable<TimeLine> SelectAllTimeLines() =>
            SelectAll<TimeLine>();

        public async ValueTask<TimeLine> SelectTimeLineByIdAsync(Guid timeLineId) =>
            await SelectAsync<TimeLine>(timeLineId);

        public async ValueTask<TimeLine> UpdateTimeLineAsync(TimeLine timeLine) =>
            await UpdateAsync<TimeLine>(timeLine);

        public async ValueTask<TimeLine> DeleteTimeLineAsync(TimeLine timeLine) =>
            await DeleteAsync<TimeLine>(timeLine);
    }
}
