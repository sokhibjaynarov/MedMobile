// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Models.Doctors;
using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.ViewModels.Doctors;

namespace MedMobile.Api.Services.Doctors
{
    public class DoctorService : IDoctorService
    {
        private readonly ILoggingBroker loggingBroker;
        private readonly IStorageBroker storageBroker;

        public DoctorService(IStorageBroker storageBroker,
            ILoggingBroker loggingBroker)
        {
            this.loggingBroker = loggingBroker;
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
                loggingBroker.LogError(ex);
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
                loggingBroker.LogError(sqlException);
                throw new NotImplementedException();
            }
        }

        public async ValueTask<Doctor> AddDoctorAsync(DoctorForCreateViewModel viewModel)
        {
            try
            {
                if (viewModel.HospitalId == Guid.Empty)
                {
                    throw new Exception();
                }

                Doctor doctor = new Doctor
                {
                    HospitalId = viewModel.HospitalId,
                    Description = viewModel.Description
                };

                return await storageBroker.InsertDoctorAsync(doctor);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }


        public async ValueTask<Doctor> ModifyDoctorAsync(DoctorForUpdateViewModel viewModel)
        {
            try
            {
                Doctor doctor = await storageBroker.SelectDoctorByIdAsync(viewModel.DoctorId);
                return await storageBroker.UpdateDoctorAsync(doctor);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }


        public async ValueTask<Doctor> RemoveDoctorByIdAsync(Guid doctorId)
        {
            try
            {
                var doctor = await storageBroker.SelectDoctorByIdAsync(doctorId);

                if (doctor == null)
                {
                    throw new Exception();
                }

                return await storageBroker.DeleteDoctorAsync(doctor);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public IQueryable<Doctor> RetrieveAllDoctors()
        {
            try
            {
                return this.storageBroker.SelectAllDoctors();
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<Doctor> RetrieveDoctorByIdAsync(Guid doctorId)
        {
            try
            {
                Doctor maybeDoctor =
                    await this.storageBroker.SelectDoctorByIdAsync(doctorId);
                return maybeDoctor;
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
