using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ITicketRepository
    {
        // dobijanje karti
        Task<IReadOnlyList<Ticket>> GetTicketsAsync();

        // dobijanje karte po id-u
        Task<Ticket> GetTicketByIdAsync(int id);

        // dobijanje mjesta
        Task<IReadOnlyList<Seat>> GetSeats();

        // dobijanje mjesta po id-u
        Task<Seat> GetSeatById(int id);
    }
}