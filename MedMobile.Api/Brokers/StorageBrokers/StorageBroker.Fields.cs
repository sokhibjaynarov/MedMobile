// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Fields;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial class StorageBroker
    {
        public DbSet<Field> Fields { get; set; }
        public async ValueTask<Field> InsertFieldAsync(Field field) =>
            await InsertAsync(field);

        public IQueryable<Field> SelectAllFields() =>
            SelectAll<Field>();

        public async ValueTask<Field> SelectFieldByIdAsync(Guid fieldId) =>
            await SelectAsync<Field>(fieldId);

        public async ValueTask<Field> UpdateFieldAsync(Field field) =>
            await UpdateAsync<Field>(field);

        public async ValueTask<Field> DeleteFieldAsync(Field field) =>
            await DeleteAsync<Field>(field);
    }
}
