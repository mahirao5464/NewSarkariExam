using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewSarkariExam.DataAccess.Data.Repository.IRepository;
using NewSarkariExam.Models;
using NewSarkariExam.Models.APIResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewSarkariExam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        private readonly IUnitOfWork _unityOfWork;

        private readonly ILogger<ResultController> _logger;

        public ResultController(ILogger<ResultController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unityOfWork = unitOfWork;
        }
        [HttpPost("AddJob"), Authorize]
        public CategoryResponse AddJob([FromBody] Result job)
        {
            Job dbJob = new Job();
            //PropertyCopier<JobApiModel, Job>.Copy(job, dbJob);
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                //if (!_unityOfWork.Job.IsAlreadyAvailable(dbJob))
                //{
                //    _unityOfWork.Job.Add(dbJob);
                //    _unityOfWork.Save();
                //    apiResponse.Message = "Successfully Inserted ";
                //    apiResponse.Code = 200;
                //    apiResponse.Description = $"{job.PostShortName} successfully inserted in database";
                //    return apiResponse;
                //}
                apiResponse.Message = "This is Already Available in Database";
                apiResponse.Code = 409;
                apiResponse.Description = $" Already Available in Database";
                return apiResponse;
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.StackTrace);
                return apiResponse;
            }

        }

    }
}
