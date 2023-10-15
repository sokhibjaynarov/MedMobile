// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Files;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial interface IStorageBroker
    {
        ValueTask<File> InsertFileAsync(File File);
        IQueryable<File> SelectAllFiles();
        ValueTask<File> SelectFileByIdAsync(Guid fileId);
        ValueTask<File> UpdateFileAsync(File file);
        ValueTask<File> DeleteFileAsync(File file);
    }
}
