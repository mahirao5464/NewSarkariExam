using System;
using NewSarkariExam.DataAccess.Data.Repository.IRepository;
using NewSarkariExam.Models;
using System.Linq;
using NewSarkariExam.Utility;
using System.Collections.Generic;

namespace NewSarkariExam.DataAccess.Data.Repository
{
    public class JobRepository :  Repository<Job>, IJobRepository
    {
        private readonly ApplicationDbContext _db;

        public JobRepository(ApplicationDbContext db) : base(db)
        {
            this._db = db; 
        }

        public bool IsAlreadyAvailable(Job job)
        {
            return _db.Jobs.Any(el => (el.PostName == job.PostName || el.AdvtNo == job.AdvtNo) && el.CategoryId == job.CategoryId);
        }

        public void Update(Job job)
        {
            var objectFromDb = _db.Jobs.Find(job.Id);
            if (objectFromDb != null)
            {
                PropertyCopier<Job, Job>.Copy(job, objectFromDb);  
                // _db.ImportantDates.Where(el=>el.Job.Id ==  job.Id);
                var impDates = _db.ImportantDates.Where(el=>el.Job.Id ==  job.Id);//.Except(job.ImportantDates);
                var impLinks = _db.PostLinks.Where(el=>el.Job.Id ==  job.Id);
                var toRemove= new List<ImportantDates>();
                var toRemoveLink = new List<PostLinks>();
                //var toRemove = impDates.Where(el=> job.ImportantDates.Any(et=> et.Id == el.Id));
                foreach (var item in impDates)
                {
                    var available = job.ImportantDates.Any(el=>el.Id == item.Id);

                    if( available ){
                        toRemove.Add(item);
                    }
                    //toRemove.Add(impDates.Where());
                }
                foreach (var item in impLinks)
                {
                    var available = job.ImportantLinks.Any(el=>el.LinkId == item.LinkId);

                    if( available ){
                        toRemoveLink.Add(item);
                    }
                    //toRemove.Add(impDates.Where());
                }
                _db.ImportantDates.RemoveRange(toRemove);
                _db.PostLinks.RemoveRange(toRemoveLink);
                _db.Jobs.Update(objectFromDb);

            }
        }
        public bool IsUpdatable(Job job)
        {
            return _db.Jobs.Any(el => (el.PostName == job.PostName || el.AdvtNo == job.AdvtNo) && el.CategoryId == job.CategoryId && el.Id != job.Id);
        }
        
    }
}
