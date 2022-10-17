using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class TicketWithFilterCountSpecification : BaseSpecification<Ticket>
    {
        public TicketWithFilterCountSpecification(TicketsParams ticketParams) : base(
            x => (string.IsNullOrEmpty(ticketParams.Search) || x.Name.ToLower().Contains(ticketParams.Search)) && 
                 (!ticketParams.SeatId.HasValue || x.SeatId == ticketParams.SeatId)
        )
        {
        }
    }
}