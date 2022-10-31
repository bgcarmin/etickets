using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Ticket,TicketReturnDto>()
            .ForMember(m => m.SeatLocation, n => n.MapFrom(f => f.Seat.Type))
            .ForMember(m => m.SeatTotalNumber, n => n.MapFrom(f => f.Seat.TotalNumber))
            .ForMember(m => m.SeatAvailableNumber, n => n.MapFrom(f => f.Seat.AvailableNumber))
            .ForMember(m => m.PhotoUrl, n => n.MapFrom<TicketUrlResolver>());
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<UserBasketDto, UserBasket>();
            CreateMap<BasketItemDto, BasketItem>();
        }
    }
}