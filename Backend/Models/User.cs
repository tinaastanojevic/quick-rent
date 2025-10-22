using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(35)]
        public required string Username { get; set; }

        [EmailAddress]
        public required string Email { get; set; }

        public required string Password { get; set; }

        public required UserRole Role { get; set; }

        public virtual ICollection<Equipment>? Equipments { get; set; }

        public virtual ICollection<RentalRequest>? RentalRequests { get; set; }

        public virtual ICollection<EquipmentPublishRequest>? EquipmentPublishRequests { get; set; }


    }
    public enum UserRole
    {
        Admin,
        Customer,
        Owner
    }
}