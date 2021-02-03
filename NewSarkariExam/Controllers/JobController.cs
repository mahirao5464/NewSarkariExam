using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        [HttpGet("getJobDetailByCatNJob")]
        public JsonResult getJobDetailByCatNJob(string category, string jobName = null)
        {

            try
            {
                category = category.Replace("-", " ");
                var dbCategory = _unityOfWork.Category.GetFirstOrDefault(cat => cat.ShortName == category);

                if (dbCategory != null)
                {
                    if (!string.IsNullOrEmpty(jobName))
                    {
                        jobName = jobName.Replace("-", " ");
                        var Job = _unityOfWork.Job.GetFirstOrDefault(el => el.PostName == jobName && el.CategoryId == dbCategory.Id, "Category,ImportantLinks,ImportantDates");
                        if(Job == null ) return new JsonResult(new { StatusCode = HttpStatusCode.NotFound, Message = "Job not found" });

                        Job.PostedOn=Job.PostedOn.Date;
                        var jobToReturn = new object[1] { Job };

                        return new JsonResult(new
                        {
                            StatusCode = HttpStatusCode.OK,
                            Jobs = jobToReturn
                        });
                    }
                    else
                    {
                        return new JsonResult(new
                        {
                            StatusCode = HttpStatusCode.OK,
                            Jobs = _unityOfWork.Job.GetAll().Where(el => el.CategoryId == dbCategory.Id).Select(
                    Job => new { Id = Job.Id, PostName = Job.PostName, PostShortName = Job.PostShortName, category = Job.Category.ShortName, PostedOn = Job.LastUpdatedOn.ToString("dd/MM/yyyy") }).OrderByDescending(el => el.Id)
                        });
                    }



                }
                else
                {
                    return new JsonResult(new { StatusCode = HttpStatusCode.NotFound, Message = "Category not found" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return new JsonResult(new { StatusCode = HttpStatusCode.InternalServerError, Message = "InternalServerError" });
            }

        }
        [HttpGet("GetJobs")]
        public JsonResult GetJobs()
        {

            try
            {
                return new JsonResult(new
                {
                    StatusCode = HttpStatusCode.OK,
                    Jobs = _unityOfWork.Job.GetAll(null, null, "Category").Select(
                    Job => new { Id = Job.Id, PostName = Job.PostName, PostShortName = Job.PostShortName, category = Job.Category.ShortName, PostedOn = Job.LastUpdatedOn.ToString("dd/MM/yyyy") }).OrderByDescending(el => el.Id).Take(10)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return new JsonResult(new { StatusCode = HttpStatusCode.InternalServerError, Message = "InternalServerError" });
            }

        }
        [HttpGet]
        public IEnumerable<Job> Get()
        {
            try
            {

                return _unityOfWork.Job.GetAll(null, null, "Category,ImportantLinks,ImportantDates");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return new List<Job>();
            }

        }
        [HttpPost("AddJob"), Authorize]
        public CategoryResponse AddJob([FromBody] JobApiModel job)
        {
            Job dbJob = new Job();
            PropertyCopier<JobApiModel, Job>.Copy(job, dbJob);
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                if (!_unityOfWork.Job.IsAlreadyAvailable(dbJob))
                {
                    dbJob.PostedOn = new DateTime();
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
        [HttpPost("DeleteJob"), Authorize]
        public CategoryResponse DeleteJob([FromBody] JobApiModel job)
        {
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {

                var dbJob = _unityOfWork.Job.GetFirstOrDefault(el => el.Id == job.Id, "ImportantLinks,ImportantDates");
                _unityOfWork.Job.Remove(dbJob);
                _unityOfWork.Save();
                apiResponse.Message = "Successfully delete Job ";
                apiResponse.Code = 200;
                apiResponse.Description = $"{job.PostName} successfully delete";
                return apiResponse;

            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.StackTrace);
                return apiResponse;
            }

        }
        [HttpPost("UpdateJob"), Authorize]
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
        [HttpGet("GetCategoryListForDropDown"), Authorize]
        public IEnumerable<SelectListItem> GetCategoryListForDropDown()
        {
            return _unityOfWork.Category.GetCategoryListForDropDown();
        }
    }
}
