using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rental
    {

        [Key]
        public int ID { get; set; }

        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User Renter { get; set; }

        public int EquipmentID { get; set; }

        [ForeignKey("EquipmentID")]
        public virtual Equipment Equipment { get; set; } //navigaciono svojstvo, ne cuva se u bazi, samo omogucava da lakse pristupim ovom objektu


        public DateTime RentedAt{get;set;}

        public DateTime? ReturnedAt{get;set;}

        public bool IsReturned=>ReturnedAt.HasValue; //ne cuva se u bazi nego se racuna kada je potrebno
    }
}