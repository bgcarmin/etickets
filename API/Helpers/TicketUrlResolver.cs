using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class TicketUrlResolver : IValueResolver<Ticket, TicketReturnDto, string>
    {
        private readonly IConfiguration _configuration;
        public TicketUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Resolve(Ticket source, TicketReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PhotoUrl))
            {
                return _configuration["ApiUrl"] + source.PhotoUrl;
            }

            // ako nema linka za sliku
            return null;
        }
    }
}