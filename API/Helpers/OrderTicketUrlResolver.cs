using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities.Order;

namespace API.Helpers
{
    public class OrderTicketUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _configuration;
        public OrderTicketUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.TicketOrdered.PhotoUrl))
            {
                return _configuration["ApiUrl"] + source.TicketOrdered.PhotoUrl;
            }

            return null;
        }
    }
}