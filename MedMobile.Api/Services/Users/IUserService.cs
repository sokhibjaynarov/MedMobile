// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.ViewModels.Doctors;
using MedMobile.Api.ViewModels.Hospitals;
using MedMobile.Api.ViewModels.Patients;
using MedMobile.Api.ViewModels.Users;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Users
{
    public interface IUserService
    {
        ValueTask<PatientForGetViewModel> RegisterPatientAsync(RegisterPatientViewModel registerPatientViewModel);
        ValueTask<Guid> AddHospitalAdminAsync(HospitalForCreateViewModel viewModel);
        ValueTask<Guid> AddDoctorAsync(DoctorForCreateViewModel viewModel);
    }
}
