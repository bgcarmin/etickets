using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class ContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory logger)
        {
            try
            {
                if(!context.Seats.Any())
                {
                    // citaju se podaci iz json filea
                    var seatsFile = File.ReadAllText("../Infrastructure/Data/SeedToDatabase/seats.json");
                    // dobija se lista podataka
                    var seats = JsonSerializer.Deserialize<List<Seat>>(seatsFile);

                    // dodaje se svaki element u bazu
                    foreach(var item in seats) 
                    {
                        context.Seats.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if(!context.Tickets.Any())
                {
                    // citaju se podaci iz json filea
                    var ticketsFile = File.ReadAllText("../Infrastructure/Data/SeedToDatabase/tickets.json");
                    // dobija se lista podataka
                    var tickets = JsonSerializer.Deserialize<List<Ticket>>(ticketsFile);

                    // dodaje se svaki element u bazu
                    foreach(var item in tickets) 
                    {
                        context.Tickets.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception exception)
            {
                var log = logger.CreateLogger<ContextSeed>();
                log.LogError(exception.Message);
            }
        }
    }
}