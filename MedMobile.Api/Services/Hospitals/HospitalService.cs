// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Hospitals;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;

namespace MedMobile.Api.Services.Hospitals
{
    public class HospitalService : IHospitalService
    {
        private readonly IStorageBroker storageBroker;

        public HospitalService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        private delegate ValueTask<Hospital> ReturningHospitalFunction();
        private delegate IQueryable<Hospital> ReturningHospitalsFunction();

        private async ValueTask<Hospital> TryCatch(ReturningHospitalFunction returningHospitalFunction)
        {
            try
            {
                return await returningHospitalFunction();
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
            }
        }

        private IQueryable<Hospital> TryCatch(ReturningHospitalsFunction returningHospitalsFunction)
        {
            try
            {
                return returningHospitalsFunction();
            }
            catch (SqlException sqlException)
            {
                throw new NotImplementedException();
            }
        }

        public ValueTask<Hospital> AddHospitalAsync(Hospital hospital) =>
        TryCatch(async () =>
        {
            return await this.storageBroker.InsertHospitalAsync(hospital);
        });


        public ValueTask<Hospital> ModifyHospitalAsync(Hospital hospital) =>
            TryCatch(async () =>
            {
                Hospital maybeHospital =
                    await this.storageBroker.SelectHospitalByIdAsync(hospital.HospitalId);
                return await storageBroker.UpdateHospitalAsync(hospital);
            });


        public ValueTask<Hospital> RemoveHospitalByIdAsync(Guid hospitalId) =>
            TryCatch(async () =>
            {
                Hospital maybeHospital =
                await this.storageBroker.SelectHospitalByIdAsync(hospitalId);

                return await storageBroker.DeleteHospitalAsync(maybeHospital);
            });

        public IQueryable<Hospital> RetrieveAllHospitals() =>
            TryCatch(() =>
                 this.storageBroker.SelectAllHospitals());

        public ValueTask<Hospital> RetrieveHospitalByIdAsync(Guid hospitalId) =>
            TryCatch(async () =>
            {
                Hospital maybeHospital =
                    await storageBroker.SelectHospitalByIdAsync(hospitalId);
                return maybeHospital;
            });
    }
}
