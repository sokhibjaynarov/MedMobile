// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Hospitals;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial interface IStorageBroker
    {
        ValueTask<Hospital> InsertHospitalAsync(Hospital hospital);
        IQueryable<Hospital> SelectAllHospitals();
        ValueTask<Hospital> SelectHospitalByIdAsync(Guid hospitalId);
        ValueTask<Hospital> UpdateHospitalAsync(Hospital hospital);
        ValueTask<Hospital> DeleteHospitalAsync(Hospital hospital);
    }
}
