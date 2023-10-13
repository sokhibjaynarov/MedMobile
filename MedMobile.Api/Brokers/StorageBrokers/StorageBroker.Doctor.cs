// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Doctors;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial class StorageBroker
    {
        public DbSet<Doctor> Doctors { get; set; }
        public async ValueTask<Doctor> InsertDoctorAsync(Doctor doctor) =>
            await InsertAsync(doctor);

        public IQueryable<Doctor> SelectAllDoctors() =>
            SelectAll<Doctor>();

        public async ValueTask<Doctor> SelectDoctorByIdAsync(Guid doctorId) =>
            await SelectAsync<Doctor>(doctorId);

        public async ValueTask<Doctor> UpdateDoctorAsync(Doctor doctor) =>
            await UpdateAsync<Doctor>(doctor);

        public async ValueTask<Doctor> DeleteDoctorAsync(Doctor doctor) =>
            await DeleteAsync<Doctor>(doctor);
    }
}
