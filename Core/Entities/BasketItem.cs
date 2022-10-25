using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Seat { get; set; }
        public decimal Price { get; set; }
        public string PhotoUrl { get; set; }
        public string DateTime { get; set; }
        public int Quantity { get; set; }
    }
}