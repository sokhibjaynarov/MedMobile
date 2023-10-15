// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Files;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Files
{
    public interface IFileService
    {
        ValueTask<File> AddFileAsync(File file);

        ValueTask<File> RetrieveFileByIdAsync(Guid fileId);

        ValueTask<File> RemoveFileByIdAsync(Guid fileId);
    }
}
