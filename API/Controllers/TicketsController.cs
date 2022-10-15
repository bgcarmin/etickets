using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
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
        private readonly IMapper _mapper;
        public TicketsController(IGenericRepository<Ticket> ticketRep, IGenericRepository<Seat> seatRep,
            IMapper mapper)
        {
            _mapper = mapper;
            _seatRep = seatRep;
            _ticketRep = ticketRep;
            
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TicketReturnDto>>> GetTickets() 
        {
            // return Ok(await _ticketRep.GetAllAsync());

            // kreiranje specifikacije
            var specification = new TicketWithSeatSpecification();
            var tickets = await _ticketRep.GetListWithSpec(specification);

            var returnTickets = _mapper.Map<IReadOnlyList<Ticket>,IReadOnlyList<TicketReturnDto>>(tickets);

            return Ok(returnTickets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketReturnDto>> GetTicket(int id)
        {
            var specification = new TicketWithSeatSpecification(id);
            var ticket = await _ticketRep.GetEntityWithSpec(specification);

            var returnTicket = _mapper.Map<TicketReturnDto>(ticket);

            return Ok(returnTicket);
            // return Ok(await _ticketRep.GetByIdAsync(id));
        }

        [HttpGet("seats")]
        public async Task<ActionResult<IReadOnlyList<Seat>>> GetSeats()
        {
            return Ok(await _seatRep.GetAllAsync());
        }
    }
}