using SalesOrderSystem_BackEnd.Models;

namespace SalesOrderSystem.BackEnd.Application.Interfaces;

public interface ICustomerService
{
    Task<IEnumerable<CustomerDto>> GetAllAsync();
    Task<CustomerDto?> GetByIdAsync(int id); 
    Task<IEnumerable<CustomerDto>> GetByNameAsync(string name);
    Task<CustomerDto> CreateAsync(CustomerDto dto);
    Task<CustomerDto?> UpdateAsync(int id, CustomerDto dto);
    Task<bool> DeleteAsync(int id);
}