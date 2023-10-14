// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Fields;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;

namespace MedMobile.Api.Services.Fields
{
    public class FieldService : IFieldService
    {
        private readonly IStorageBroker storageBroker;

        public FieldService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        private delegate ValueTask<Field> ReturningFieldFunction();
        private delegate IQueryable<Field> ReturningFieldsFunction();

        private async ValueTask<Field> TryCatch(ReturningFieldFunction returningFieldFunction)
        {
            try
            {
                return await returningFieldFunction();
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
            }
        }

        private IQueryable<Field> TryCatch(ReturningFieldsFunction returningFieldsFunction)
        {
            try
            {
                return returningFieldsFunction();
            }
            catch (SqlException sqlException)
            {
                throw new NotImplementedException();
            }
        }

        public ValueTask<Field> AddFieldAsync(Field field) =>
        TryCatch(async () =>
        {
            return await this.storageBroker.InsertFieldAsync(field);
        });


        public ValueTask<Field> ModifyFieldAsync(Field field) =>
            TryCatch(async () =>
            {
                Field maybeField =
                    await this.storageBroker.SelectFieldByIdAsync(field.FieldId);
                return await storageBroker.UpdateFieldAsync(field);
            });


        public ValueTask<Field> RemoveFieldByIdAsync(Guid fieldId) =>
            TryCatch(async () =>
            {
                Field maybeField =
                await this.storageBroker.SelectFieldByIdAsync(fieldId);

                return await storageBroker.DeleteFieldAsync(maybeField);
            });

        public IQueryable<Field> GetAllFields() =>
            TryCatch(() =>
                 this.storageBroker.SelectAllFields());

        public ValueTask<Field> GetFieldByIdAsync(Guid fieldId) =>
            TryCatch(async () =>
            {
                Field maybeField =
                    await storageBroker.SelectFieldByIdAsync(fieldId);
                return maybeField;
            });
    }
}
