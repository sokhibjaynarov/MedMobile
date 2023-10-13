// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Hospitals;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial class StorageBroker
    {
        public DbSet<Hospital> Hospitals { get; set; }
        public async ValueTask<Hospital> InsertHospitalAsync(Hospital hospital) =>
            await InsertAsync(hospital);

        public IQueryable<Hospital> SelectAllHospitals() =>
            SelectAll<Hospital>();

        public async ValueTask<Hospital> SelectHospitalByIdAsync(Guid hospitalId) =>
            await SelectAsync<Hospital>(hospitalId);

        public async ValueTask<Hospital> UpdateHospitalAsync(Hospital hospital) =>
            await UpdateAsync<Hospital>(hospital);

        public async ValueTask<Hospital> DeleteHospitalAsync(Hospital hospital) =>
            await DeleteAsync<Hospital>(hospital);
    }
}
