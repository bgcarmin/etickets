using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TicketReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SeatLocation { get; set; }
        public int SeatTotalNumber { get; set; }
        public int SeatAvailableNumber { get; set; }
        public decimal Price { get; set; }
        public string PhotoUrl { get; set; }
        public string DateTime { get; set; }
    }
}