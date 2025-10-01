using Backend.Models;

public class RentalRequestDTO
{
    public int EquipmentID { get; set; }
    public int UserID { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

public class RentalRequestResponseDTO
{
    public int ID { get; set; }

    public EquipmentResponseDTO Equipment { get; set; }

    public DateTime RequestDate { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public string? RequestedBy { get; set; }

    public RequestStatus Status { get; set; }


}
