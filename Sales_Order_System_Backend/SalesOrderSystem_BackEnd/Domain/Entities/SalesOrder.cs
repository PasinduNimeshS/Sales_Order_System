using SalesOrderSystem_BackEnd.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalesOrderSystem.BackEnd.Domain.Entities;

public class SalesOrder
{
    public int Id { get; set; }
    public string InvoiceNo { get; set; } = string.Empty;
    public DateTime InvoiceDate { get; set; }
    public int CustomerId { get; set; }

    [ForeignKey("CustomerId")]
    public Customer Customer { get; set; } = null!;

    public string ReferenceNo { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;

    public List<OrderItem> Items { get; set; } = new();
    public decimal TotalExcl { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalIncl { get; set; }
}

public class OrderItem
{
    public int Id { get; set; }
    public int SalesOrderId { get; set; }
    public string ItemCode { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal TaxRate { get; set; }
    public decimal ExclAmount { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal InclAmount { get; set; }
}