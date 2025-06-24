using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class RentalRequest
    {
        [Key]
        public int ID { get; set; }

        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }

        public int EquipmentID { get; set; }
        [ForeignKey("EquipmentID")]
        public virtual Equipment Equipment { get; set; }

        public DateTime RequestDate { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public RequestStatus Status { get; set; }

        public RentalRequest()
        {
            Status = RequestStatus.Pending;
            RequestDate = DateTime.UtcNow;
        }

    }
    public enum RequestStatus
    {
        Pending,
        Approved,
        Rejected
    }
}