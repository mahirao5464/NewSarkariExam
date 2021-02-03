using System;
using System.Collections.Generic;
using System.Text;

namespace NewSarkariExam.DataAccess.Data.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        ICategoryRepository Category { get; }
        public IJobRepository Job { get; }
        public IResultRepository Result { get; }
        void Save();
    }
}
