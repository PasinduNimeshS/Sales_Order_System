using Microsoft.EntityFrameworkCore;
using SalesOrderSystem.BackEnd.Application.Interfaces;
using SalesOrderSystem.BackEnd.Application.Services;
using SalesOrderSystem.BackEnd.Infrastructure.Data;
using SalesOrderSystem.BackEnd.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// === 1. DATABASE ===
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// === 2. AUTOMAPPER ===
builder.Services.AddAutoMapper(typeof(Program));

// === 3. DEPENDENCY INJECTION (Services + Repositories) ===
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();

builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();

builder.Services.AddScoped<ISalesOrderService, SalesOrderService>();
builder.Services.AddScoped<ISalesOrderRepository, SalesOrderRepository>();

// === 4. CONTROLLERS + SWAGGER ===
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// === 5. CORS (Fix for React localhost:5173) ===
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")   // Vite React dev server
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// === PIPELINE ===
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ORDER MATTERS:
// 1. CORS
app.UseCors("AllowReactApp");

// 2. HTTPS + Auth
app.UseHttpsRedirection();
app.UseAuthorization();

// 3. Map Controllers
app.MapControllers();

app.Run();