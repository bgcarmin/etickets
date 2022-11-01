using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        
        private readonly IBasketRepository _basketRepo;
        private readonly ILogger<OrderService> _logger;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo, ILogger<OrderService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _basketRepo = basketRepo;

        }

        public async Task<Order> CreateOrderAsync(string email, int deliveryMethod, string basketId, Address shippingAddress)
        {
            var basket = await _basketRepo.GetUserBasketAsync(basketId);
            // _logger.LogInformation("proslo basket");
            var orderTickets = new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var ticketItem = await _unitOfWork.Repository<Ticket>().GetByIdAsync(item.Id);
                // _logger.LogInformation("proslo 1");
                var ticketOrdererd = new TicketItemOrdered(ticketItem.Id, ticketItem.Name, ticketItem.PhotoUrl);
                // _logger.LogInformation("proslo 2");
                var orderItem = new OrderItem(ticketOrdererd, ticketItem.Price, item.Quantity);
                // _logger.LogInformation("proslo 3");
                orderTickets.Add(orderItem);
                // _logger.LogInformation("proslo 4");
            }
            // _logger.LogInformation("proslo foreach");
            var delMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethod);
            // _logger.LogInformation("proslo delivery");
            var subtotal = orderTickets.Sum(o => o.Price * o.Quantity);

            var order = new Order(email, shippingAddress, delMethod, orderTickets, subtotal);
            // _logger.LogInformation("proslo order");

            _unitOfWork.Repository<Order>().Add(order);
            var result = await _unitOfWork.Complete();

            if(result <= 0) 
            {
                return null;
            }

            await _basketRepo.DeleteUserBasketAsync(basketId);

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string email)
        {
            var spec = new OrdersWithItemsSpecification(id, email);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetUserOrdersAsync(string email)
        {
            var spec = new OrdersWithItemsSpecification(email);
            return await _unitOfWork.Repository<Order>().GetListWithSpec(spec);
        }
    }
}