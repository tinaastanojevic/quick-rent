
using Backend.Models;

public class RoleChangeRequestDTO
{
    public int UserID { get; set; }
}

public class RoleChangeResponseDTO
{
    public int ID { get; set; }
    public string Username { get; set; }

    public DateTime RequestDate { get; set; }

    public RequestStatus Status { get; set; }
}

public class UpdateRoleRequest
{
    public int RequestId { get; set; }

    public RequestStatus Status { get; set; }
}