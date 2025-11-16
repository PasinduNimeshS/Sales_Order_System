using SalesOrderSystem_BackEnd.API.Models;

namespace SalesOrderSystem.BackEnd.Application.Interfaces;

public interface IItemService
{
    Task<IEnumerable<ItemDto>> GetAllAsync();
    Task<ItemDto?> GetByIdAsync(int id);
    Task<ItemDto> CreateAsync(ItemDto dto);
    Task<ItemDto?> UpdateAsync(int id, ItemDto dto);
    Task<bool> DeleteAsync(int id);
}