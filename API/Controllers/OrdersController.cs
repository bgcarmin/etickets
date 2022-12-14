using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Exceptions;
using API.Extensions;
using AutoMapper;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.GetEmailFromPrincipal();
            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);
            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethod, orderDto.BasketId, address);

            if(order == null) 
            {
                return BadRequest(new Response(400, "Creating Order failed"));
            }

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderReturnDto>>> GetUserOrders()
        {
            var email = HttpContext.User.GetEmailFromPrincipal();
            var orders = await _orderService.GetUserOrdersAsync(email);

            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderReturnDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderReturnDto>> GetUserOrderById(int id)
        {
            var email = HttpContext.User.GetEmailFromPrincipal();
            var order = await _orderService.GetOrderByIdAsync(id,email);

            if(order == null) return NotFound(new Response(404));

            return _mapper.Map<Order,OrderReturnDto>(order);
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }
    }
}