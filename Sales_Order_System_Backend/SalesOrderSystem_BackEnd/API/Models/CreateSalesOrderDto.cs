namespace SalesOrderSystem_BackEnd.API.Models
{
    public class CreateSalesOrderDto
    {
        public string InvoiceNo { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public int CustomerId { get; set; }
        public string ReferenceNo { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public List<CreateOrderItemDto> Items { get; set; } = new();
    }

    public class CreateOrderItemDto
    {
        public string ItemCode { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TaxRate { get; set; }
    }
}
