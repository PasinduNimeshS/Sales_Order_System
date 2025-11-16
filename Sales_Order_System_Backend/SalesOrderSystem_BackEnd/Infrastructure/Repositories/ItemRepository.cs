using Microsoft.EntityFrameworkCore;
using SalesOrderSystem.BackEnd.Infrastructure.Data;
using SalesOrderSystem_BackEnd.Domain.Entities;

namespace SalesOrderSystem.BackEnd.Infrastructure.Repositories;

public class ItemRepository : IItemRepository
{
    private readonly AppDbContext _db;

    public ItemRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<Item>> GetAllAsync() =>
        await _db.Items.ToListAsync();

    public async Task<Item?> GetByIdAsync(int id) =>
        await _db.Items.FindAsync(id);

    public async Task AddAsync(Item item)
    {
        _db.Items.Add(item);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Item item)
    {
        _db.Items.Update(item);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Item item)
    {
        _db.Items.Remove(item);
        await _db.SaveChangesAsync();
    }
}