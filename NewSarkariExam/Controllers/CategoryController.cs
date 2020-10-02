using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewSarkariExam.DataAccess.Data.Repository.IRepository;
using NewSarkariExam.Models;
using NewSarkariExam.Models.APIResponseModels;

namespace NewSarkariExam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _unityOfWork;
        private readonly ILogger<CategoryController> _logger;
        //private ILoggerManager _logger;

        public CategoryController(IUnitOfWork unityOfWork, ILogger<CategoryController> logger)
        {
            _unityOfWork = unityOfWork;
            _logger = logger;
        }
        [HttpGet]
        public IActionResult GetAllCategory()
        {
            try
            {
                var allCategory = _unityOfWork.Category.GetAll();
                return Ok(allCategory);
            }
            catch (Exception ex)
            {
                _logger.LogError($" {ex.StackTrace} in GetAllCategory at {DateTime.UtcNow.ToLongTimeString()}");
                return Problem();
            }
            

            
        }
        [HttpPost("AddCategory"),Authorize]
        public CategoryResponse AddCategory([FromBody]Category category)
        {
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                if (!_unityOfWork.Category.IsAlreadyAvailable(category.Name))
                { 
                    _unityOfWork.Category.Add(category);
                    _unityOfWork.Save();
                    apiResponse.Message = "Successfully Inserted ";
                    apiResponse.Code = 200;
                    apiResponse.Description = $"{category.Name} successfully inserted in database";
                    return apiResponse;
                }
                apiResponse.Message = "Category Already Available in Database";
                apiResponse.Code = 409;
                apiResponse.Description = $"{category.Name} Already Available in Database";
                return apiResponse;
            }
            catch(Exception ex)
            {
                _logger.LogInformation(ex.StackTrace);
                return apiResponse;
            }
            
        }
        [HttpPost("DeleteCategory"),Authorize]
        public CategoryResponse DeleteCategory([FromBody] Category category)
        {
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                
                    _unityOfWork.Category.Update(category);
                    _unityOfWork.Save();
                    apiResponse.Message = "Successfully updated ";
                    apiResponse.Code = 200;
                    apiResponse.Description = $"{category.Name} successfully updated";
                    return apiResponse;
                
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.StackTrace);
                return apiResponse;
            }

        }
        [HttpPost("UpdateCategory"),Authorize]
        public CategoryResponse UpdateCategory([FromBody] Category category)
        {
            CategoryResponse apiResponse = new CategoryResponse();
            try
            {
                if (!_unityOfWork.Category.IsUpdatable(category))
                {
                    _unityOfWork.Category.Update(category);
                    _unityOfWork.Save();
                    apiResponse.Message = "Successfully Updated ";
                    apiResponse.Code = 200;
                    apiResponse.Description = $"{category.Name} successfully Updated in database";
                    return apiResponse;
                }
                apiResponse.Message = "Category Already Available in Database";
                apiResponse.Code = 409;
                apiResponse.Description = $"{category.Name} Already Available in Database";
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
