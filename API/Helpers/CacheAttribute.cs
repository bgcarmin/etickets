using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class CacheAttribute : Attribute, IAsyncActionFilter
    {
        private readonly int _timeSpanSeconds;
        public CacheAttribute(int timeSpanSeconds)
        {
            _timeSpanSeconds = timeSpanSeconds;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cacheService = context.HttpContext.RequestServices.GetRequiredService<ICacheService>();

            var key = GenerateCacheKey(context.HttpContext.Request);

            var cachedResponse = await cacheService.GetCachedResponseAsync(key);

            // ako nije prazan vraca se iz cachea
            if(!string.IsNullOrEmpty(cachedResponse))
            {
                var result = new ContentResult
                {
                    Content = cachedResponse,
                    ContentType = "application/json",
                    StatusCode = 200
                };

                context.Result = result;

                return;
            }

            var executedContext = await next();
            if(executedContext.Result is OkObjectResult okObjectResult)
            {
                await cacheService.CacheResponseAsync(key, okObjectResult.Value, TimeSpan.FromSeconds(_timeSpanSeconds));
            }
        }

        private string GenerateCacheKey(HttpRequest request)
        {
            // sortirati parametre requesta

            var keyBuilder = new StringBuilder();
            keyBuilder.Append($"{request.Path}");

            foreach(var (key,value) in request.Query.OrderBy(o => o.Key))
            {
                keyBuilder.Append($"|{key}-{value}");
            }

            return keyBuilder.ToString();
        }
    }
}