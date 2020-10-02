using NewSarkariExam.DataAccess.Data.Repository.IRepository;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using NewSarkariExam.Models;

namespace NewSarkariExam.DataAccess.Data.Repository
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly ApplicationDbContext _db;
        public CategoryRepository(ApplicationDbContext db) : base(db)
        {
            this._db = db;
        }

        public IEnumerable<SelectListItem> GetCategoryListForDropDown()
        {
            return _db.Category.Where(el => el.CategoryStatus).Select(i => new SelectListItem()
            {
                Text = i.Name,
                Value = i.Id.ToString()
            }); 
        }

        public void Update(Category category)
        {
            var objFromDb = _db.Category.FirstOrDefault<Category>(s=>s.Id==category.Id);
            objFromDb.Name = category.Name;
            objFromDb.StateName = category.StateName;
            objFromDb.CategoryStatus = category.CategoryStatus;
            objFromDb.ShortName = category.ShortName;
            objFromDb.Description = category.Description;

            _db.SaveChanges();
        }
        public bool IsAlreadyAvailable(string categoryName)
        {
            return _db.Category.Any(el => el.Name == categoryName);
        }
        public bool IsUpdatable(Category category)
        {
            return _db.Category.Any(el => el.Name == category.Name && el.Id != category.Id);
        }
    }
}
