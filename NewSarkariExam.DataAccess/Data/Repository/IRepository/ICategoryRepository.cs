using Microsoft.AspNetCore.Mvc.Rendering;
using NewSarkariExam.Models;
using System.Collections.Generic;

namespace NewSarkariExam.DataAccess.Data.Repository.IRepository
{
    public interface ICategoryRepository : IRepository<Category> 
    {
        IEnumerable<SelectListItem> GetCategoryListForDropDown();
        void Update(Category category);
        bool IsAlreadyAvailable(string categoryName);
        bool IsUpdatable(Category category);
    }
}
