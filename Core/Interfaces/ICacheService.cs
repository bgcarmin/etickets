using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICacheService
    {
        Task CacheResponseAsync(string key, object response, TimeSpan timeSpan);
        Task<string> GetCachedResponseAsync(string key);
    }
}