using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TicketsController : BaseApiController
    {
        // private readonly ITicketRepository _ticketRep;
        private readonly IGenericRepository<Ticket> _ticketRep;
        public TicketsController(IGenericRepository<Ticket> ticketRep)
        {
            _ticketRep = ticketRep;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Ticket>>> GetTickets() 
        {
            return Ok(await _ticketRep.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            return Ok(await _ticketRep.GetByIdAsync(id));
        }
    }
}