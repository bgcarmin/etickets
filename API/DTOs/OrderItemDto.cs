using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderItemDto
    {
        public int TicketId { get; set; }
        public string TicketName { get; set; }
        public string PhotoUrl { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}