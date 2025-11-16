using Microsoft.EntityFrameworkCore;
using SalesOrderSystem.BackEnd.Infrastructure.Data;
using SalesOrderSystem_BackEnd.Domain.Entities;

namespace SalesOrderSystem.BackEnd.Infrastructure.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly AppDbContext _db;

    public CustomerRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<Customer>> GetAllAsync() =>
        await _db.Customers.ToListAsync();

    public async Task<Customer?> GetByIdAsync(int id) =>
        await _db.Customers.FindAsync(id);

    // FIXED: Use EF.Functions.Like for SQL translation
    public async Task<IEnumerable<Customer>> GetByNameAsync(string name) =>
        await _db.Customers
            .Where(c => EF.Functions.Like(c.Name, $"%{name}%"))
            .ToListAsync();

    public async Task AddAsync(Customer customer)
    {
        _db.Customers.Add(customer);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Customer customer)
    {
        _db.Customers.Update(customer);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Customer customer)
    {
        _db.Customers.Remove(customer);
        await _db.SaveChangesAsync();
    }
}