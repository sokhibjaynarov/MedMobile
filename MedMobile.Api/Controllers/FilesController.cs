// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Files;
using MedMobile.Api.Services.Files;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System;
using System.Threading.Tasks;

namespace MedMobile.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FilesController : RESTFulController
    {
        private readonly IFileService fileService;

        public FilesController(IFileService fileService)
        {
            this.fileService = fileService;
        }

        [HttpPost]
        public async ValueTask<ActionResult<File>> AddFile(File file)
        {
            try
            {
                var newFile = await fileService.AddFileAsync(file);
                return Ok(newFile);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async ValueTask<ActionResult<File>> GetFile(Guid fileId)
        {
            try
            {
                var file = await fileService.RetrieveFileByIdAsync(fileId);
                return Ok(file);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async ValueTask<ActionResult<File>> DeleteFile(Guid fileId)
        {
            try
            {
                var file = await fileService.RemoveFileByIdAsync(fileId);
                return Ok(file);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
