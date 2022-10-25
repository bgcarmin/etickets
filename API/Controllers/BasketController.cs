using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<UserBasket>> GetUserBasketById(string id)
        {
            var userBasket = await _basketRepository.GetUserBasketAsync(id);
            return Ok(userBasket ?? new UserBasket(id));
        }

        [HttpDelete]
        public async Task DeleteUserBasket(string id)
        {
            await _basketRepository.DeleteUserBasketAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<UserBasket>> UpdateUserBasket(UserBasket basket)
        {
            var updatedData = await _basketRepository.UpdateUserBasketAsync(basket);
            return Ok(updatedData);
        }
    }
}