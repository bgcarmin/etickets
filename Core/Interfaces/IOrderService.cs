using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Order;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string email, int deliveryMethod, string basketId, Address shippingAddress); 
        Task<IReadOnlyList<Order>> GetUserOrdersAsync(string email);
        Task<Order> GetOrderByIdAsync(int id, string email);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}