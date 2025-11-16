using AutoMapper;
using SalesOrderSystem.BackEnd.Application.Interfaces;
using SalesOrderSystem.BackEnd.Infrastructure.Repositories;
using SalesOrderSystem_BackEnd.Domain.Entities;
using SalesOrderSystem_BackEnd.Models;

namespace SalesOrderSystem.BackEnd.Application.Services;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repo;
    private readonly IMapper _mapper;

    public CustomerService(ICustomerRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CustomerDto>> GetAllAsync()
    {
        var customers = await _repo.GetAllAsync();
        return _mapper.Map<IEnumerable<CustomerDto>>(customers);
    }

    public async Task<CustomerDto?> GetByIdAsync(int id)
    {
        var customer = await _repo.GetByIdAsync(id);
        return customer == null ? null : _mapper.Map<CustomerDto>(customer);
    }

    public async Task<IEnumerable<CustomerDto>> GetByNameAsync(string name)
    {
        var customers = await _repo.GetByNameAsync(name);
        return _mapper.Map<IEnumerable<CustomerDto>>(customers);
    }

    public async Task<CustomerDto> CreateAsync(CustomerDto dto)
    {
        var customer = _mapper.Map<Customer>(dto);
        await _repo.AddAsync(customer);
        return _mapper.Map<CustomerDto>(customer);
    }

    public async Task<CustomerDto?> UpdateAsync(int id, CustomerDto dto)
    {
        var customer = await _repo.GetByIdAsync(id);
        if (customer == null) return null;

        _mapper.Map(dto, customer);
        await _repo.UpdateAsync(customer);
        return _mapper.Map<CustomerDto>(customer);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var customer = await _repo.GetByIdAsync(id);
        if (customer == null) return false;

        await _repo.DeleteAsync(customer);
        return true;
    }
}