using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Ticket : BaseEntity
    {
        public string Name { get; set; }
        public Seat Seat { get; set; }
        public int SeatId { get; set; }
        public decimal Price { get; set; }
        public string PhotoUrl { get; set; }
        public string DateTime { get; set; }
    }
}