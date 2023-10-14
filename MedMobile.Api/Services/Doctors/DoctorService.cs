// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Models.Doctors;

namespace MedMobile.Api.Services.Doctors
{
    public class DoctorService : IDoctorService
    {
        private readonly IStorageBroker storageBroker;

        public DoctorService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        private delegate ValueTask<Doctor> ReturningDoctorFunction();
        private delegate IQueryable<Doctor> ReturningDoctorsFunction();

        private async ValueTask<Doctor> TryCatch(ReturningDoctorFunction returningDoctorFunction)
        {
            try
            {
                return await returningDoctorFunction();
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
            }
        }

        private IQueryable<Doctor> TryCatch(ReturningDoctorsFunction returningDoctorsFunction)
        {
            try
            {
                return returningDoctorsFunction();
            }
            catch (SqlException sqlException)
            {
                throw new NotImplementedException();
            }
        }

        public ValueTask<Doctor> AddDoctorAsync(Doctor doctor) =>
        TryCatch(async () =>
        {
                return await this.storageBroker.InsertDoctorAsync(doctor);
        });


        public ValueTask<Doctor> ModifyDoctorAsync(Doctor doctor) =>
            TryCatch(async () =>
            {
                Doctor maybeDoctor =
                    await this.storageBroker.SelectDoctorByIdAsync(doctor.DoctorId);
                return await storageBroker.UpdateDoctorAsync(doctor);
            });


        public ValueTask<Doctor> RemoveDoctorByIdAsync(Guid doctorId) =>
            TryCatch(async () =>
            {
                Doctor maybeDoctor =
                await this.storageBroker.SelectDoctorByIdAsync(doctorId);

                return await storageBroker.DeleteDoctorAsync(maybeDoctor);
            });

        public IQueryable<Doctor> RetrieveAllDoctors() =>
            TryCatch(() =>
                 this.storageBroker.SelectAllDoctors());

        public ValueTask<Doctor> RetrieveDoctorByIdAsync(Guid doctorId) =>
            TryCatch(async () =>
            {
                Doctor maybeDoctor =
                    await storageBroker.SelectDoctorByIdAsync(doctorId);
                return maybeDoctor;
            });
    }
}
