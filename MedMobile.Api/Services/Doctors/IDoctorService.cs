// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Doctors;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Doctors
{
    public interface IDoctorService
    {
        ValueTask<Doctor> AddDoctorAsync(Doctor doctor);
        IQueryable<Doctor> RetrieveAllDoctors();
        ValueTask<Doctor> RetrieveDoctorByIdAsync(Guid doctorId);
        ValueTask<Doctor> ModifyDoctorAsync(Doctor doctor);
        ValueTask<Doctor> RemoveDoctorByIdAsync(Guid doctorId);
    }
}
