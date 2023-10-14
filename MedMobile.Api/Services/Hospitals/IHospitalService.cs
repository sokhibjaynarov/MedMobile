// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Hospitals;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.ViewModels.Hospitals;
using MedMobile.Api.ViewModels.Pagination;

namespace MedMobile.Api.Services.Hospitals
{
    public interface IHospitalService
    {
        ValueTask<Guid> AddHospitalAsync(HospitalForCreateViewModel viewModel);
        Task<PaginationResponse> GetAllHospitalsAsync(string searchText, int skip, int take);
        ValueTask<Hospital> GetHospitalByIdAsync(Guid hospitalId);
        ValueTask<Hospital> ModifyHospitalAsync(Hospital hospital);
        ValueTask<Hospital> RemoveHospitalByIdAsync(Guid hospitalId);
    }
}
