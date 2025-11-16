using SalesOrderSystem_BackEnd.Domain.Entities;

namespace SalesOrderSystem.BackEnd.Infrastructure.Repositories;

public interface IItemRepository
{
    Task<IEnumerable<Item>> GetAllAsync();
    Task<Item?> GetByIdAsync(int id);
    Task AddAsync(Item item);
    Task UpdateAsync(Item item);
    Task DeleteAsync(Item item);
}