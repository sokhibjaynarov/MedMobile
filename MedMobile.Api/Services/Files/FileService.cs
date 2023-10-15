// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Brokers.StorageBrokers;
using MedMobile.Api.Models.Files;
using MedMobile.Api.Models.TimeLines;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Files
{
    public class FileService : IFileService
    {
        private readonly ILoggingBroker loggingBroker;
        private readonly IStorageBroker storageBroker;

        public FileService(ILoggingBroker loggingBroker, IStorageBroker storageBroker)
        {
            this.loggingBroker = loggingBroker;
            this.storageBroker = storageBroker;
        }

        public async ValueTask<File> AddFileAsync(File file)
        {
            try
            {
                return await this.storageBroker.InsertFileAsync(file);
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<File> RemoveFileByIdAsync(Guid fileId)
        {
            try
            {
                return await this.storageBroker.SelectFileByIdAsync(fileId);
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }

        public async ValueTask<File> RetrieveFileByIdAsync(Guid fileId)
        {
            try
            {
                File maybeFile =
                    await storageBroker.SelectFileByIdAsync(fileId);
                return await this.storageBroker.DeleteFileAsync(maybeFile);
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
