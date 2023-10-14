// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Doctors;
using MedMobile.Api.ViewModels.Doctors;

namespace MedMobile.Api.Services.Doctors
{
    public interface IDoctorService
    {
        ValueTask<Doctor> AddDoctorAsync(DoctorForCreateViewModel viewModel);
        IQueryable<Doctor> GetAllDoctors();
        ValueTask<Doctor> GetDoctorByIdAsync(Guid doctorId);
        ValueTask<Doctor> ModifyDoctorAsync(DoctorForUpdateViewModel viewModel);
        ValueTask<Doctor> RemoveDoctorByIdAsync(Guid doctorId);
    }
}
