using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class RoleChangeRequest
    {
        [Key]
        public int ID { get; set; }

        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }

        public DateTime RequestDate { get; set; }

        public RequestStatus Status { get; set; }

        public RoleChangeRequest()
        {
            Status=RequestStatus.Pending;
             RequestDate=DateTime.UtcNow;
        }

    }
}