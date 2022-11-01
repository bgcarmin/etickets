using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Seat> Seats { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            // za sqlite decimal problem prebaciti u double 
            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach(var type in modelBuilder.Model.GetEntityTypes())
                {
                    var props = type.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));
                    var dateTimeProps = type.ClrType.GetProperties().Where(p => p.PropertyType == typeof(DateTimeOffset));

                    foreach(var prop in props)
                    {
                        modelBuilder.Entity(type.Name).Property(prop.Name).HasConversion<double>();
                    }

                    foreach(var prop in dateTimeProps)
                    {
                        modelBuilder.Entity(type.Name).Property(prop.Name).HasConversion(new DateTimeOffsetToBinaryConverter());
                    }
                }
            }
        }



    }
}