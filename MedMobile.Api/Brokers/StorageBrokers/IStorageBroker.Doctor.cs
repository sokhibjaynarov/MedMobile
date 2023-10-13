// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Doctors;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial interface IStorageBroker
    {
        ValueTask<Doctor> InsertDoctorAsync(Doctor doctor);
        IQueryable<Doctor> SelectAllDoctors();
        ValueTask<Doctor> SelectDoctorByIdAsync(Guid doctorId);
        ValueTask<Doctor> UpdateDoctorAsync(Doctor doctor);
        ValueTask<Doctor> DeleteDoctorAsync(Doctor doctor);
    }
}
