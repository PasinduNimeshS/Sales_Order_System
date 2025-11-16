using SalesOrderSystem_BackEnd.API.Models;

namespace SalesOrderSystem.BackEnd.Application.Interfaces;

public interface ISalesOrderService
{
    Task<IEnumerable<SalesOrderDto>> GetAllAsync();
    Task<SalesOrderDto?> GetByIdAsync(int id);
    Task<SalesOrderDto> CreateAsync(SalesOrderDto dto);
    Task<SalesOrderDto?> UpdateAsync(SalesOrderDto dto);
}