using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class UserBasket
    {
        public UserBasket()
        {
        }

        public UserBasket(string id)
        {
            Id = id;
        }



        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    }
}