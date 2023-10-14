// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Hospitals;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.ViewModels.Hospitals;

namespace MedMobile.Api.Services.Hospitals
{
    public interface IHospitalService
    {
        ValueTask<Guid> AddHospitalAsync(HospitalForCreateViewModel viewModel);
        IQueryable<Hospital> GetAllHospitals();
        ValueTask<Hospital> GetHospitalByIdAsync(Guid hospitalId);
        ValueTask<Hospital> ModifyHospitalAsync(Hospital hospital);
        ValueTask<Hospital> RemoveHospitalByIdAsync(Guid hospitalId);
    }
}
