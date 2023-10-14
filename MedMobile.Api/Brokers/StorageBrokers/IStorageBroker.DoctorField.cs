// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Doctors;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial interface IStorageBroker
    {
        ValueTask<DoctorField> InsertDoctorFieldAsync(DoctorField doctorField);
        IQueryable<DoctorField> SelectAllDoctorFields();
        ValueTask<DoctorField> SelectDoctorFieldByIdAsync(Guid doctorFieldId);
        ValueTask<DoctorField> UpdateDoctorFieldAsync(DoctorField doctorField);
        ValueTask<DoctorField> DeleteDoctorFieldAsync(DoctorField doctorField);
    }
}
