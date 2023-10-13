// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Fields;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial interface IStorageBroker
    {
        ValueTask<Field> InsertFieldAsync(Field field);
        IQueryable<Field> SelectAllFields();
        ValueTask<Field> SelectFieldByIdAsync(Guid fieldId);
        ValueTask<Field> UpdateFieldAsync(Field field);
        ValueTask<Field> DeleteFieldAsync(Field field);
    }
}
