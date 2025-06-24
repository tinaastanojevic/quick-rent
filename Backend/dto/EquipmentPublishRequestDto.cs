using Backend.Models;

public class EquipmentPublishRequestDTO
{
    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }

    public decimal Price { get; set; }

    public string? ImageUrl { get; set; }

    public int UserId { get; set; }
}

public class UpadeteStatusDto
{
    public string Status { get; set; }
}

// public class EquipmentPublishDTO
// {
//     public string Name { get; set; }
//     public string Description { get; set; }
//     public string Category { get; set; }
//     public decimal Price { get; set; }
//     public string Location { get; set; }
//     public IFormFile Image { get; set; }
//     public int UserId { get; set; }

// }
