// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Hospitals;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.ViewModels.Hospitals;
using Microsoft.EntityFrameworkCore;
using MedMobile.Api.StaticFunctions;
using System.Collections;
using System.Collections.Generic;
using MedMobile.Api.ViewModels.Pagination;

namespace MedMobile.Api.Services.Hospitals
{
    public class HospitalService : IHospitalService
    {
        private readonly IStorageBroker storageBroker;
        private readonly ILoggingBroker loggingBroker;

        public HospitalService(
            IStorageBroker storageBroker,
            ILoggingBroker loggingBroker)
        {
            this.storageBroker = storageBroker;
            this.loggingBroker = loggingBroker;
        }

        public async ValueTask<Guid> AddHospitalAsync(HospitalForCreateViewModel viewModel)
        {
            try
            {
                var existHospital = await this.storageBroker.SelectAllHospitals().FirstOrDefaultAsync(p => p.Name == viewModel.Name);

                if (existHospital != null)
                {
                    throw new Exception(ResponseMessages.ERROR_EXIST_DATA);
                }

                var newHospital = new Hospital()
                {
                    Name = viewModel.Name,
                    Description = viewModel.Description,
                    Email = viewModel.Email,
                    PhoneNumber = viewModel.PhoneNumber,
                    Website = viewModel.Website,
                    Longitude = viewModel.Longitude,
                    Latitude = viewModel.Latitude
                };

                var hospital = await storageBroker.InsertHospitalAsync(newHospital);

                return hospital.HospitalId;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }


        public async ValueTask<Hospital> ModifyHospitalAsync(Hospital hospital)
        {
            try
            {
                Hospital maybeHospital =
                    await storageBroker.SelectHospitalByIdAsync(hospital.HospitalId);
                return await storageBroker.UpdateHospitalAsync(hospital);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }


        public async ValueTask<Hospital> RemoveHospitalByIdAsync(Guid hospitalId)
        {
            try
            {
                Hospital maybeHospital =
                await storageBroker.SelectHospitalByIdAsync(hospitalId);

                return await storageBroker.DeleteHospitalAsync(maybeHospital);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async Task<PaginationResponse> GetAllHospitalsAsync(string searchText, int skip, int take)
        {
            try
            {
                var hospitalQuery = storageBroker.SelectAllHospitals();

                if (string.IsNullOrEmpty(searchText))
                {
                    searchText = searchText.ToLower();
                    hospitalQuery = hospitalQuery.Where(a => a.Name.ToLower() == searchText);
                }

                var count = hospitalQuery.Count();

                var hospitals = hospitalQuery.Select(a => new HospitalForGetViewModel
                {
                    HospitalId = a.HospitalId,
                    Name = a.Name,
                    Description = a.Description,
                    Longitude = a.Longitude,
                    Latitude = a.Latitude,
                    Website = a.Website,
                    Email = a.Email,
                    PhoneNumber = a.PhoneNumber
                });

                return new PaginationResponse(hospitals, skip, take, count);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<Hospital> GetHospitalByIdAsync(Guid hospitalId)
        {
            try
            {
                Hospital maybeHospital =
                   await storageBroker.SelectHospitalByIdAsync(hospitalId);
                return maybeHospital;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
