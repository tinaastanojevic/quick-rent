

using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Rental> Rentals { get; set; }

        public DbSet<RentalRequest> RentalRequests { get; set; }

        public DbSet<RoleChangeRequest> RoleChangeRequests { get; set; }

        public DbSet<EquipmentPublishRequest> EquipmentPublishRequests { get; set; }



        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<RentalRequest>()
                .Property(r => r.Status)
                .HasConversion<string>();

            modelBuilder.Entity<RoleChangeRequest>()
                .Property(r => r.Status)
                .HasConversion<string>();

            modelBuilder.Entity<EquipmentPublishRequest>()
            .Property(e => e.Status)
            .HasConversion<string>();
        }
    }
}