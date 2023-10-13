// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Fields;
using System;
using System.Linq;
using System.Threading.Tasks;

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
