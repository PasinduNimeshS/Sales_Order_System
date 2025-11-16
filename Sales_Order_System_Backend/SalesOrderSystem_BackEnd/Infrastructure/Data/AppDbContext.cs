using Microsoft.EntityFrameworkCore;
using SalesOrderSystem.BackEnd.Domain.Entities;
using SalesOrderSystem_BackEnd.Domain.Entities;

namespace SalesOrderSystem.BackEnd.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Item> Items => Set<Item>();
    public DbSet<SalesOrder> SalesOrders => Set<SalesOrder>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SalesOrder>()
            .HasOne(o => o.Customer)
            .WithMany()
            .HasForeignKey(o => o.CustomerId);

        modelBuilder.Entity<OrderItem>()
            .HasOne<SalesOrder>()
            .WithMany(o => o.Items)
            .HasForeignKey(oi => oi.SalesOrderId);
    }
}