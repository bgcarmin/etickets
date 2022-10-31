using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddressDto
    {
        [Required(ErrorMessage="Id is required")]
        public int Id { get; set; }
        [Required(ErrorMessage="First Name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage="Last Name is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage="Country is required")]
        public string Country { get; set; }
        [Required(ErrorMessage="Zip Code is required")]
        public string ZipCode { get; set; }
        [Required(ErrorMessage="City Name is required")]
        public string City { get; set; }
        [Required(ErrorMessage="Street Name is required")]
        public string Street { get; set; }
    }
}