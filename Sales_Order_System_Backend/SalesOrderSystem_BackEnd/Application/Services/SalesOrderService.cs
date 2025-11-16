using AutoMapper;
using SalesOrderSystem.BackEnd.Application.Interfaces;
using SalesOrderSystem.BackEnd.Domain.Entities;
using SalesOrderSystem.BackEnd.Infrastructure.Repositories;
using SalesOrderSystem_BackEnd.API.Models;

namespace SalesOrderSystem.BackEnd.Application.Services;

public class SalesOrderService : ISalesOrderService
{
    private readonly ISalesOrderRepository _repo;
    private readonly IMapper _mapper;

    public SalesOrderService(ISalesOrderRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SalesOrderDto>> GetAllAsync()
    {
        var orders = await _repo.GetAllWithDetailsAsync();
        return _mapper.Map<IEnumerable<SalesOrderDto>>(orders);
    }

    public async Task<SalesOrderDto?> GetByIdAsync(int id)
    {
        var order = await _repo.GetByIdWithDetailsAsync(id);
        return order == null ? null : _mapper.Map<SalesOrderDto>(order);
    }

    public async Task<SalesOrderDto> CreateAsync(SalesOrderDto dto)
    {
        var order = _mapper.Map<SalesOrder>(dto);
        order.InvoiceDate = DateTime.Parse(dto.InvoiceDate);

        Recalculate(order);

        await _repo.AddAsync(order);
        return _mapper.Map<SalesOrderDto>(order);
    }

    public async Task<SalesOrderDto?> UpdateAsync(SalesOrderDto dto)
    {
        var existing = await _repo.GetByIdWithDetailsAsync(dto.Id);
        if (existing == null) return null;

        _mapper.Map(dto, existing);
        existing.InvoiceDate = DateTime.Parse(dto.InvoiceDate);

        Recalculate(existing);

        await _repo.UpdateAsync(existing);
        return _mapper.Map<SalesOrderDto>(existing);
    }

    private static void Recalculate(SalesOrder order)
    {
        foreach (var item in order.Items)
        {
            item.ExclAmount = item.Quantity * item.Price;
            item.TaxAmount = item.ExclAmount * item.TaxRate / 100;
            item.InclAmount = item.ExclAmount + item.TaxAmount;
        }
        order.TotalExcl = order.Items.Sum(x => x.ExclAmount);
        order.TotalTax = order.Items.Sum(x => x.TaxAmount);
        order.TotalIncl = order.Items.Sum(x => x.InclAmount);
    }
}