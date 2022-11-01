using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(TicketItemOrdered ticketOrdered, decimal price, int quantity)
        {
            TicketOrdered = ticketOrdered;
            Price = price;
            Quantity = quantity;
        }

        public TicketItemOrdered TicketOrdered { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}