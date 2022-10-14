using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TicketsController : BaseApiController
    {
        // private readonly ITicketRepository _ticketRep;
        private readonly IGenericRepository<Ticket> _ticketRep;
        private readonly IGenericRepository<Seat> _seatRep;
        public TicketsController(IGenericRepository<Ticket> ticketRep, IGenericRepository<Seat> seatRep)
        {
            _seatRep = seatRep;
            _ticketRep = ticketRep;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Ticket>>> GetTickets() 
        {
            // return Ok(await _ticketRep.GetAllAsync());

            // kreiranje specifikacije
            var specification = new TicketWithSeatSpecification();
            var tickets = await _ticketRep.GetListWithSpec(specification);

            return Ok(tickets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var specification = new TicketWithSeatSpecification(id);
            var ticket = await _ticketRep.GetEntityWithSpec(specification);

            return Ok(ticket);
            // return Ok(await _ticketRep.GetByIdAsync(id));
        }

        [HttpGet("seats")]
        public async Task<ActionResult<IReadOnlyList<Seat>>> GetSeats()
        {
            return Ok(await _seatRep.GetAllAsync());
        }
    }
}