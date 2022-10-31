using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BasketItemDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Seat { get; set; }
        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage = "Price cannot be zero")]
        public decimal Price { get; set; }
        [Required]
        public string PhotoUrl { get; set; }
        [Required]
        public string DateTime { get; set; }
        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
    }
}