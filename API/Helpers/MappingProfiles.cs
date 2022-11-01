using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.Order;

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
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<UserBasketDto, UserBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.Order.Address>();
            CreateMap<Order,OrderReturnDto>()
             .ForMember(m => m.DeliveryMethod, n => n.MapFrom(f => f.DeliveryMethod.ShortName))
             .ForMember(m => m.ShippingPrice, n => n.MapFrom(f => f.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
             .ForMember(m => m.TicketId, n => n.MapFrom(f => f.TicketOrdered.TicketItemId))
             .ForMember(m => m.TicketName, n => n.MapFrom(f => f.TicketOrdered.Name))
             .ForMember(m => m.PhotoUrl, n => n.MapFrom(f => f.TicketOrdered.PhotoUrl))
             .ForMember(m => m.PhotoUrl, n => n.MapFrom<OrderTicketUrlResolver>());
        }
    }
}