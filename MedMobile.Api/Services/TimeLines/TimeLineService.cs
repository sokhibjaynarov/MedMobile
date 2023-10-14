// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Models.TimeLines;
using Microsoft.Data.SqlClient;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.TimeLines
{
    public class TimeLineService : ITimeLineService
    {
        private readonly IStorageBroker storageBroker;

        public TimeLineService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        private delegate ValueTask<TimeLine> ReturningTimeLineFunction();
        private delegate IQueryable<TimeLine> ReturningTimeLinesFunction();

        private async ValueTask<TimeLine> TryCatch(ReturningTimeLineFunction returningTimeLineFunction)
        {
            try
            {
                return await returningTimeLineFunction();
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
            }
        }

        private IQueryable<TimeLine> TryCatch(ReturningTimeLinesFunction returningTimeLinesFunction)
        {
            try
            {
                return returningTimeLinesFunction();
            }
            catch (SqlException sqlException)
            {
                throw new NotImplementedException();
            }
        }

        public ValueTask<TimeLine> AddTimeLineAsync(TimeLine timeLine) =>
        TryCatch(async () =>
        {
            return await this.storageBroker.InsertTimeLineAsync(timeLine);
        });


        public ValueTask<TimeLine> ModifyTimeLineAsync(TimeLine timeLine) =>
            TryCatch(async () =>
            {
                TimeLine maybeTimeLine =
                    await this.storageBroker.SelectTimeLineByIdAsync(timeLine.TimeLineId);
                return await storageBroker.UpdateTimeLineAsync(timeLine);
            });


        public ValueTask<TimeLine> RemoveTimeLineByIdAsync(Guid timeLineId) =>
            TryCatch(async () =>
            {
                TimeLine maybeTimeLine =
                await this.storageBroker.SelectTimeLineByIdAsync(timeLineId);

                return await storageBroker.DeleteTimeLineAsync(maybeTimeLine);
            });

        public IQueryable<TimeLine> RetrieveAllTimeLines() =>
            TryCatch(() =>
                 this.storageBroker.SelectAllTimeLines());

        public ValueTask<TimeLine> RetrieveTimeLineByIdAsync(Guid timeLineId) =>
            TryCatch(async () =>
            {
                TimeLine maybeTimeLine =
                    await storageBroker.SelectTimeLineByIdAsync(timeLineId);
                return maybeTimeLine;
            });
    }
}
