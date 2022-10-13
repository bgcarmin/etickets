using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class TicketsConfiguration : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder.Property(b => b.Id).IsRequired();
            builder.Property(b => b.Name).IsRequired();
            builder.Property(b => b.Price).HasColumnType("decimal(18,3)");
            builder.Property(b => b.PhotoUrl).IsRequired();
            builder.HasOne(b => b.Seat).WithMany().HasForeignKey(p => p.SeatId);
        }
    }
}