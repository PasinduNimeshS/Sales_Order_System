using AutoMapper;
using SalesOrderSystem.BackEnd.Application.Interfaces;
using SalesOrderSystem.BackEnd.Infrastructure.Repositories;
using SalesOrderSystem_BackEnd.API.Models;
using SalesOrderSystem_BackEnd.Domain.Entities;

namespace SalesOrderSystem.BackEnd.Application.Services;

public class ItemService : IItemService
{
    private readonly IItemRepository _repo;
    private readonly IMapper _mapper;

    public ItemService(IItemRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ItemDto>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return _mapper.Map<IEnumerable<ItemDto>>(items);
    }

    public async Task<ItemDto?> GetByIdAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        return item == null ? null : _mapper.Map<ItemDto>(item);
    }

    public async Task<ItemDto> CreateAsync(ItemDto dto)
    {
        var item = _mapper.Map<Item>(dto);
        await _repo.AddAsync(item);
        return _mapper.Map<ItemDto>(item);
    }

    public async Task<ItemDto?> UpdateAsync(int id, ItemDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return null;

        _mapper.Map(dto, item);
        await _repo.UpdateAsync(item);
        return _mapper.Map<ItemDto>(item);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return false;

        await _repo.DeleteAsync(item);
        return true;
    }
}