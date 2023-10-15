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
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MedMobile.Api.ViewModels.Hospitals;
using MedMobile.Api.ViewModels.Users;
using MedMobile.Api.ViewModels.Fields;

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

        public async ValueTask<IEnumerable<DoctorForGetViewModel>> GetAllDoctorsAsync(Guid? hospitalId, List<Guid> fieldIds)
        {
            try
            {
                var doctorQuery = storageBroker.SelectAllDoctors();

                if (hospitalId != null)
                {
                    doctorQuery = doctorQuery.Where(a => a.HospitalId == hospitalId);
                }

                if (fieldIds != null && fieldIds.Any())
                {
                    doctorQuery = doctorQuery.Where(a => a.DoctorFields.Any(b => fieldIds.Contains(b.FieldId)));
                }

                var doctors = await doctorQuery.Select(a => new DoctorForGetViewModel
                {
                    DoctorId = a.DoctorId,
                    PasportNumber = a.User.PassportNumber,
                    PhoneNumber = a.User.PhoneNumber,
                    Description = a.Description,
                    User = new UserViewModel
                    {
                        FirstName = a.User.FirstName,
                        LastName = a.User.LastName,
                        FatherName = a.User.FatherName,
                        Email = a.User.Email
                    },
                    Hospital = new HospitalForGetViewModel
                    {
                        HospitalId = a.HospitalId,
                        Name = a.Hospital.Name,
                        Longitude = a.Hospital.Longitude,
                        Latitude = a.Hospital.Latitude
                    },
                    Fields = a.DoctorFields.Select(d => new FieldForGetViewModel
                    {
                        FieldId = d.FieldId,
                        Name = d.Field.Name,
                        Description = d.Field.Description
                    })
                }).ToListAsync();
                return doctors;
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<Doctor> GetDoctorByIdAsync(Guid doctorId)
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
