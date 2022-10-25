using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<UserBasket> GetUserBasketAsync(string basketId);
        Task<UserBasket> UpdateUserBasketAsync(UserBasket basket);
        Task<bool> DeleteUserBasketAsync(string basketId);
    }
}