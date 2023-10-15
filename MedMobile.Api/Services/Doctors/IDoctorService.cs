// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Doctors;
using MedMobile.Api.ViewModels.Doctors;
using System.Collections.Generic;

namespace MedMobile.Api.Services.Doctors
{
    public interface IDoctorService
    {
        ValueTask<Doctor> AddDoctorAsync(DoctorForCreateViewModel viewModel);
        ValueTask<IEnumerable<DoctorForGetViewModel>> GetAllDoctorsAsync(Guid? hospitalId, List<Guid> fieldIds);
        ValueTask<Doctor> GetDoctorByIdAsync(Guid doctorId);
        ValueTask<Doctor> ModifyDoctorAsync(DoctorForUpdateViewModel viewModel);
        ValueTask<Doctor> RemoveDoctorByIdAsync(Guid doctorId);
    }
}
