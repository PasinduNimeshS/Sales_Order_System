using Microsoft.EntityFrameworkCore;
using SalesOrderSystem.BackEnd.Domain.Entities;
using SalesOrderSystem.BackEnd.Infrastructure.Data;

namespace SalesOrderSystem.BackEnd.Infrastructure.Repositories;

public class SalesOrderRepository : ISalesOrderRepository
{
    private readonly AppDbContext _db;
    public SalesOrderRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<SalesOrder>> GetAllWithDetailsAsync() =>
        await _db.SalesOrders
            .Include(o => o.Customer)
            .Include(o => o.Items)
            .ToListAsync();

    public async Task<SalesOrder?> GetByIdWithDetailsAsync(int id) =>
        await _db.SalesOrders
            .Include(o => o.Customer)
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

    public async Task AddAsync(SalesOrder order)
    {
        _db.SalesOrders.Add(order);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(SalesOrder order)
    {
        _db.SalesOrders.Update(order);
        await _db.SaveChangesAsync();
    }
}