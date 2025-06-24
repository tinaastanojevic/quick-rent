public class UserDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class UserResponseDTO
{
    public int ID { get; set; }
    public string Email { get; set; }

    public string Username { get; set; }

    public string Token { get; set; }
}

public class OwnerProfileInfoDTO
{
    public int ID { get; set; }
    public string Email { get; set; }

    public string Username { get; set; }

    public List<EquipmentResponseDTO>? Equipments{get;set;}

}