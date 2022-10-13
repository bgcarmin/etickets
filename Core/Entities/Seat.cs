using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Seat : BaseEntity
    {
        public string Section { get; set; }
        public int Number { get; set; }
    }
}