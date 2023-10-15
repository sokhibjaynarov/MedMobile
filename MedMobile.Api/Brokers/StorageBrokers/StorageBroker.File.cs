// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Models.Files;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial class StorageBroker
    {
        public DbSet<File> Files { get; set; }
        public async ValueTask<File> InsertFileAsync(File file) =>
            await InsertAsync(file);

        public IQueryable<File> SelectAllFiles() =>
            SelectAll<File>();

        public async ValueTask<File> SelectFileByIdAsync(Guid fileId) =>
            await SelectAsync<File>(fileId);

        public async ValueTask<File> UpdateFileAsync(File file) =>
            await UpdateAsync<File>(file);

        public async ValueTask<File> DeleteFileAsync(File file) =>
            await DeleteAsync<File>(file);
    }
}
