public class EquipmentDTO
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public decimal Price { get; set; }
    public string Location { get; set; }
    public string? ImageUrl { get; set; }

    public IFormFile? Image { get; set; }

    public bool IsAvailable { get; set; }
    public int UserID { get; set; }

}

public class EquipmentResponseDTO
{

    public int ID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public decimal Price { get; set; }
    public string Location { get; set; }
    public string? ImageUrl { get; set; }

    public bool IsAvailable { get; set; }
    public DateTime CreatedAt { get; set; }
    public string OwnerUsername { get; set; }
}

