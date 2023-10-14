// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Fields;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Models.Hospitals;
using MedMobile.Api.ViewModels.Pagination;
using MedMobile.Api.ViewModels.Fields;

namespace MedMobile.Api.Services.Fields
{
    public class FieldService : IFieldService
    {
        private readonly ILoggingBroker loggingBroker;
        private readonly IStorageBroker storageBroker;

        public FieldService(
            ILoggingBroker loggingBroker,
            IStorageBroker storageBroker)
        {
            this.loggingBroker = loggingBroker;
            this.storageBroker = storageBroker;
        }

        public async ValueTask<Field> AddFieldAsync(Field field)
        {
            try
            {
                return await this.storageBroker.InsertFieldAsync(field);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }


        public async ValueTask<Field> ModifyFieldAsync(Field field)
        {
            try
            {
                Field maybeField =
                    await this.storageBroker.SelectFieldByIdAsync(field.FieldId);
                return await storageBroker.UpdateFieldAsync(field);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }


        public async ValueTask<Field> RemoveFieldByIdAsync(Guid fieldId)
        {
            try
            {
                Field maybeField =
                await this.storageBroker.SelectFieldByIdAsync(fieldId);

                return await storageBroker.DeleteFieldAsync(maybeField);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async Task<PaginationResponse> GetAllFieldsAsync(string searchText, int skip, int take)
        {
            try
            {
                var fieldQuery = storageBroker.SelectAllFields();

                if (!string.IsNullOrEmpty(searchText))
                {
                    searchText = searchText.ToLower();
                    fieldQuery = fieldQuery.Where(a => a.Name.ToLower() == searchText);
                }

                var count = fieldQuery.Count();

                var fields = fieldQuery.OrderBy(a => a.Name).Select(a => new FieldForGetViewModel
                {
                    FieldId = a.FieldId,
                    Name = a.Name,
                    Description = a.Description
                }).Skip(skip).Take(take).ToList();

                return new PaginationResponse(fields, skip, take, count);
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<Field> GetFieldByIdAsync(Guid fieldId)
        {
            try
            {
                Field maybeField =
                    await storageBroker.SelectFieldByIdAsync(fieldId);
                return maybeField;
            }
            catch (Exception ex)
            {
                loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
