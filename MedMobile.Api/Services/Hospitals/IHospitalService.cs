// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Hospitals;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Services.Hospitals
{
    public interface IHospitalService
    {
        ValueTask<Hospital> AddHospitalAsync(Hospital hospital);
        IQueryable<Hospital> RetrieveAllHospitals();
        ValueTask<Hospital> RetrieveHospitalByIdAsync(Guid hospitalId);
        ValueTask<Hospital> ModifyHospitalAsync(Hospital hospital);
        ValueTask<Hospital> RemoveHospitalByIdAsync(Guid hospitalId);
    }
}
