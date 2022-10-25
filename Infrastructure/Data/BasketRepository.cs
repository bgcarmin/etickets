using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _redisDb;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _redisDb = redis.GetDatabase();
        }

        public async Task<bool> DeleteUserBasketAsync(string basketId)
        {
            return await _redisDb.KeyDeleteAsync(basketId);
        }

        public async Task<UserBasket> GetUserBasketAsync(string basketId)
        {
            var basket = await _redisDb.StringGetAsync(basketId);

            return basket.IsNullOrEmpty ? null : JsonSerializer.Deserialize<UserBasket>(basket);
        }

        public async Task<UserBasket> UpdateUserBasketAsync(UserBasket basket)
        {
            var setBasket = await _redisDb.StringSetAsync(basket.Id,JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));
            if(!setBasket) {
                return null;
            }

            return await GetUserBasketAsync(basket.Id);
        }
    }
}