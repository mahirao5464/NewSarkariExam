using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using NewSarkariExam.DataAccess.Data.Repository.IRepository;
using NewSarkariExam.Models;
using NewSarkariExam.Models.APIResponseModels;
using NewSarkariExam.Utility;

namespace NewSarkariExam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : ControllerBase
    {
        private readonly IUnitOfWork _unityOfWork;

        private readonly ILogger<JobController> _logger;

        public JobController(ILogger<JobController> logger, IUnitOfWork unitOfWork)
        {
            _logger = logger;
            _unityOfWork = unitOfWork;
        }

        [HttpGet, Authorize]
        public IEnumerable<Job> Get()
        {
            try
            {
                
                return _unityOfWork.Job.GetAll(null,null, "Category,ImportantLinks,ImportantDates");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return new List<Job>();
            }
            //var rng = new Random();
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateTime.Now.AddDays(index),
            //    TemperatureC = rng.Next(-20, 55),
            //    Summary = Summaries[rng.Next(Summaries.Length)]
            //})
            //.ToArray();
        }
        [HttpPost("AddJob"),Authorize]
        public CategoryResponse AddJob([FromBody] JobApiModel job)
        {
            Job dbJob = new Job();
            PropertyCopier<JobApiModel, Job>.Copy(job, dbJob);
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                if (!_unityOfWork.Job.IsAlreadyAvailable(dbJob))
                {
                    _unityOfWork.Job.Add(dbJob);
                    _unityOfWork.Save();
                    apiResponse.Message = "Successfully Inserted ";
                    apiResponse.Code = 200;
                    apiResponse.Description = $"{job.PostShortName} successfully inserted in database";
                    return apiResponse;
                }
                apiResponse.Message = "This is Already Available in Database";
                apiResponse.Code = 409;
                apiResponse.Description = $"{job.PostShortName} Already Available in Database";
                return apiResponse;
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.StackTrace);
                return apiResponse;
            }

        }
        [HttpPost("DeleteJob"),Authorize]
        public CategoryResponse DeleteJob([FromBody] JobApiModel job)
        {
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                
                   var dbJob = _unityOfWork.Job.GetFirstOrDefault(el=>el.Id == job.Id,"ImportantLinks,ImportantDates");
                    _unityOfWork.Job.Remove(dbJob);
                    _unityOfWork.Save();
                    apiResponse.Message = "Successfully updated ";
                    apiResponse.Code = 200;
                    apiResponse.Description = $"{job.PostName} successfully updated";
                    return apiResponse;
                
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.StackTrace);
                return apiResponse;
            }

        }
        [HttpPost("UpdateJob"),Authorize]
        public CategoryResponse UpdateJob([FromBody] JobApiModel job)
        {
            Job dbJob = new Job();
            PropertyCopier<JobApiModel, Job>.Copy(job, dbJob);
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                if (!_unityOfWork.Job.IsUpdatable(dbJob))
                {
                    _unityOfWork.Job.Update(dbJob);
                    _unityOfWork.Save();
                    apiResponse.Message = "Successfully Updated ";
                    apiResponse.Code = 200;
                    apiResponse.Description = $"{job.PostShortName} successfully Updated in database";
                    return apiResponse;
                }
                apiResponse.Message = "This is Already Available in Database";
                apiResponse.Code = 409;
                apiResponse.Description = $"{job.PostShortName} Already Available in Database";
                return apiResponse;
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.StackTrace);
                return apiResponse;
            }

        }
        [HttpGet("GetCategoryListForDropDown"),Authorize]
        public IEnumerable<SelectListItem> GetCategoryListForDropDown()
        {
            return _unityOfWork.Category.GetCategoryListForDropDown();
        }
    }
}
