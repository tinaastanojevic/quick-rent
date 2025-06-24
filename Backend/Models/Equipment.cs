using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{

    [Table("Equipment")]
    public class Equipment
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

        public bool IsAvailable { get; set; }

        public DateTime CreatedAt { get; set; }

        public required string Location { get; set; }

        public string? ImageUrl{get;set;}
        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User Owner { get; set; }

        public Equipment()
        {
            CreatedAt = DateTime.UtcNow;
            IsAvailable=true;
        }

    }


}