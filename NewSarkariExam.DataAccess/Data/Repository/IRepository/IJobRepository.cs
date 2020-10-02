using NewSarkariExam.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NewSarkariExam.DataAccess.Data.Repository.IRepository
{
    public interface IJobRepository : IRepository<Job>
    {
        void Update(Job job);
        bool IsAlreadyAvailable(Job job);
        bool IsUpdatable(Job job);
    }
}
