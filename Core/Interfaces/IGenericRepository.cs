using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T: BaseEntity
    {
        // upit za listu elemenata
        Task<IReadOnlyList<T>> GetAllAsync();
        // upit za element po id-u
        Task<T> GetByIdAsync(int id);

        // TODO ubuduce dodati za specifikaciju kad bude implementirana

        Task<T> GetEntityWithSpec(ISpecification<T> specification);

        Task<IReadOnlyList<T>> GetListWithSpec(ISpecification<T> specification);
        Task<int> CountWithSpec(ISpecification<T> specification);

    }
}