using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Seat : BaseEntity
    {
        public string Type { get; set; }
        public int TotalNumber { get; set; }
        public int AvailableNumber { get; set; }
    }
}