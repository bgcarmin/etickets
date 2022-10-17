using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class TicketsParams
    {
        public int PageNumber { get; set; } = 1;
        private const int _maxPageSize = 50;

        private int _pageSize = 4;
        public int PageSize 
        {
            get => _pageSize;
            set => _pageSize = (value > _maxPageSize) ? _maxPageSize : value;
        }
        public int? SeatId { get; set; }
        public string? Sort { get; set; }
        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }

    }
}