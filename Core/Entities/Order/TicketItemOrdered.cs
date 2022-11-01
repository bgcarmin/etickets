using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class TicketItemOrdered
    {
        public TicketItemOrdered()
        {
        }

        public TicketItemOrdered(int ticketItemId, string name, string photoUrl)
        {
            TicketItemId = ticketItemId;
            Name = name;
            PhotoUrl = photoUrl;
        }

        public int TicketItemId { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        
    }
}