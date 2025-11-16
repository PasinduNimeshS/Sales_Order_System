using Microsoft.AspNetCore.Mvc;
using SalesOrderSystem.BackEnd.Application.Interfaces;
using SalesOrderSystem_BackEnd.Models;

namespace SalesOrderSystem.BackEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _service;

    public CustomerController(ICustomerService service)
    {
        _service = service;
    }

    // GET: api/customer
    // Returns ALL customers
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customers = await _service.GetAllAsync();
        return Ok(customers);
    }

    // GET: api/customer/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _service.GetByIdAsync(id);
        return customer == null ? NotFound() : Ok(customer);
    }

    // GET: api/customer/search?name=Pasindu
    // Search by name
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string? name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Name is required for search.");

        var customers = await _service.GetByNameAsync(name);
        return Ok(customers);
    }

    // POST: api/customer
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CustomerDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    // PATCH: api/customer/5
    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CustomerDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var updated = await _service.UpdateAsync(id, dto);
        return updated == null ? NotFound() : Ok(updated);
    }

    // DELETE: api/customer/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        return result ? NoContent() : NotFound();
    }
}