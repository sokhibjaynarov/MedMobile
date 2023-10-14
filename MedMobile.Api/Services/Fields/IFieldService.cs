﻿// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Fields;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Services.Fields
{
    public interface IFieldService
    {
        ValueTask<Field> AddFieldAsync(Field field);
        IQueryable<Field> GetAllFields();
        ValueTask<Field> GetFieldByIdAsync(Guid fieldId);
        ValueTask<Field> ModifyFieldAsync(Field field);
        ValueTask<Field> RemoveFieldByIdAsync(Guid fieldId);
    }
}
