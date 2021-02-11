using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewSarkariExam.DataAccess.Data.Repository.IRepository;
using NewSarkariExam.Models;
using NewSarkariExam.Models.APIResponseModels;
using NewSarkariExam.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewSarkariExam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly IUnitOfWork _unityOfWork;

        private readonly ILogger<ResultsController> _logger;

        public ResultsController(ILogger<ResultsController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unityOfWork = unitOfWork;
        }
        [HttpGet("GetResultById")]
        public Result GetResultById(int? id)
        {
            return _unityOfWork.Result.GetFirstOrDefault(el=>el.JobId == id);


        }
        [HttpPost("AddResult"), Authorize]
        public CategoryResponse AddResult([FromBody] Result  result)
        {
            //Job dbJob = new Job();
            //PropertyCopier<JobApiModel, Job>.Copy(job, dbJob);
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                if (!_unityOfWork.Result.IsAlreadyAvailable(result))
                {
                    
                    result.UpdatedOn = DateTime.Now;
                    result.CreatedOn = DateTime.Now;
                    _unityOfWork.Result.Add(result);
                    _unityOfWork.Save();
                    
                }
                else
                {
                    result.UpdatedOn = DateTime.Now;
                    _unityOfWork.Result.Update(result);
                    _unityOfWork.Save();
                }
                apiResponse.Message = "Successfully Inserted ";
                apiResponse.Code = 200;
                apiResponse.Description = $"Result successfully updated for the job";
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
