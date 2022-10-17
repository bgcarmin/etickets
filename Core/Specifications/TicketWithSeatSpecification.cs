using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class TicketWithSeatSpecification : BaseSpecification<Ticket>
    {
        public TicketWithSeatSpecification(TicketsParams ticketParams) : base(
            x => (string.IsNullOrEmpty(ticketParams.Search) || x.Name.ToLower().Contains(ticketParams.Search)) && 
                 (!ticketParams.SeatId.HasValue || x.SeatId == ticketParams.SeatId)
        )
        {
            // dodaju se include za seat
            AddInclude(i => i.Seat);
            // dodaje se include za sortiranje
            AddOrderBy(i => i.Name);
            // dodaje se paging
            ApplyPaging(ticketParams.PageSize * (ticketParams.PageNumber -1), ticketParams.PageSize);

            if(!string.IsNullOrEmpty(ticketParams.Sort))
            {
                switch(ticketParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(p => p.Name);
                        break;

                }
            }
        }

        public TicketWithSeatSpecification(int id) : base(i => i.Id == id)
        {
            // trazi se ticket po id-u dodaju se include za seat
            AddInclude(i => i.Seat);
        }
    }
}