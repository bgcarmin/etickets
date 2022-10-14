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
        public TicketWithSeatSpecification()
        {
            // dodaju se include za seat
            AddInclude(i => i.Seat);
        }

        public TicketWithSeatSpecification(int id) : base(i => i.Id == id)
        {
            // trazi se ticket po id-u dodaju se include za seat
            AddInclude(i => i.Seat);
        }
    }
}