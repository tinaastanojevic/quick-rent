using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("EquipmentPublishRequest")]
    public class EquipmentPublishRequest
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(40)]
        public required string Name { get; set; }

        public required string Description { get; set; }
        public required string Category { get; set; }

        [Range(0, 1000000)]
        [Column(TypeName = "decimal(18,2)")] //18 cifara, od toga 2 su cifre posle tacke

        public decimal Price { get; set; }

        public DateTime RequestDate { get; set; }

        public required string Location { get; set; }

        public string? ImageUrl { get; set; }

        public RequestStatus Status { get; set; }


        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User RequestedBy { get; set; }

        public EquipmentPublishRequest()
        {
            Status = RequestStatus.Pending;
            RequestDate = DateTime.UtcNow;
        }

    }
}