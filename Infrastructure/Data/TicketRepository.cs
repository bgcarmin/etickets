using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class TicketRepository : ITicketRepository
    {
        private readonly StoreContext _context;
        public TicketRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Seat> GetSeatById(int id)
        {
            return await _context.Seats.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IReadOnlyList<Seat>> GetSeats()
        {
            return await _context.Seats.ToListAsync();
        }

        public async Task<Ticket> GetTicketByIdAsync(int id)
        {
            return await _context.Tickets.Include(x => x.Seat).FirstOrDefaultAsync(y => y.Id == id);
        }

        public async Task<IReadOnlyList<Ticket>> GetTicketsAsync()
        {
            return await _context.Tickets.Include(x => x.Seat).ToListAsync();
        }
    }
}