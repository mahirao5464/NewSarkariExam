using NewSarkariExam.DataAccess.Data.Repository.IRepository;
using NewSarkariExam.Models;

namespace NewSarkariExam.DataAccess.Data.Repository
{
    public interface IResultRepository : IRepository<Result>
    {
        void Update(Result result);
        bool IsAlreadyAvailable(Result result);
        //bool IsUpdatable(Result result);
    }
}