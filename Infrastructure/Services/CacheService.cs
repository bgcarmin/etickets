using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class CacheService : ICacheService
    {
        private readonly IDatabase _db;
        public CacheService(IConnectionMultiplexer redis)
        {
            _db = redis.GetDatabase();
        }

        public async Task CacheResponseAsync(string key, object response, TimeSpan timeSpan)
        {
            if(response == null) return;

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serializedResponse = JsonSerializer.Serialize(response, options);
            await _db.StringSetAsync(key, serializedResponse, timeSpan);
        }

        public async Task<string> GetCachedResponseAsync(string key)
        {
            var response = await _db.StringGetAsync(key);

            if(response.IsNullOrEmpty) return null;

            return response;
        }
    }
}