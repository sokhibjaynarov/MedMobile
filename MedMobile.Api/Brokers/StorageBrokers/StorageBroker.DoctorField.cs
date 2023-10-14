// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Doctors;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial class StorageBroker
    {
        public DbSet<DoctorField> DoctorFields { get; set; }
        public async ValueTask<DoctorField> InsertDoctorFieldAsync(DoctorField doctorField) =>
            await InsertAsync(doctorField);

        public IQueryable<DoctorField> SelectAllDoctorFields() =>
            SelectAll<DoctorField>();

        public async ValueTask<DoctorField> SelectDoctorFieldByIdAsync(Guid doctorFieldId) =>
            await SelectAsync<DoctorField>(doctorFieldId);

        public async ValueTask<DoctorField> UpdateDoctorFieldAsync(DoctorField doctorField) =>
            await UpdateAsync<DoctorField>(doctorField);

        public async ValueTask<DoctorField> DeleteDoctorFieldAsync(DoctorField doctorField) =>
            await DeleteAsync<DoctorField>(doctorField);
    }
}
