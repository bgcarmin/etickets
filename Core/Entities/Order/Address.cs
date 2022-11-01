using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class Address
    {
        public Address()
        {
        }

        public Address(string firstName, string lastName, string country, string zipCode, string city, string street)
        {
            FirstName = firstName;
            LastName = lastName;
            Country = country;
            ZipCode = zipCode;
            City = city;
            Street = street;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
    }
}