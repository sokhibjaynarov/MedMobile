// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Fields;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.ViewModels.Pagination;

namespace MedMobile.Api.Services.Fields
{
    public interface IFieldService
    {
        ValueTask<Field> AddFieldAsync(Field field);
        Task<PaginationResponse> GetAllFieldsAsync(string searchText, int skip, int take);
        ValueTask<Field> GetFieldByIdAsync(Guid fieldId);
        ValueTask<Field> ModifyFieldAsync(Field field);
        ValueTask<Field> RemoveFieldByIdAsync(Guid fieldId);
    }
}
