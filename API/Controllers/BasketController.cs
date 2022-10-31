using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _mapper = mapper;
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
        public async Task<ActionResult<UserBasket>> UpdateUserBasket(UserBasketDto basket)
        {
            var userBasket = _mapper.Map<UserBasketDto,UserBasket>(basket);
            var updatedData = await _basketRepository.UpdateUserBasketAsync(userBasket);
            return Ok(updatedData);
        }
    }
}