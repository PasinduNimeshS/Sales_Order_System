using SalesOrderSystem.BackEnd.Domain.Entities;

namespace SalesOrderSystem.BackEnd.Infrastructure.Repositories;

public interface ISalesOrderRepository
{
    Task<IEnumerable<SalesOrder>> GetAllWithDetailsAsync();
    Task<SalesOrder?> GetByIdWithDetailsAsync(int id);
    Task AddAsync(SalesOrder order);
    Task UpdateAsync(SalesOrder order);
}