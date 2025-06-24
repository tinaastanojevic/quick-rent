using AutoMapper;
using AutoMapper.QueryableExtensions;
using Backend.Context;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class EquipmentPublishRequestService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        private readonly EquipmentService _equipmentService;
        public EquipmentPublishRequestService(IMapper mapper, AppDbContext context, EquipmentService equipmentService)
        {
            _context = context;
            _mapper = mapper;
            _equipmentService = equipmentService;
        }


        public async Task<List<EquipmentResponseDTO>> GetAllEquipmentPublishRequests()
        {
            return await _context.EquipmentPublishRequests
            .Where(r => r.Status == RequestStatus.Pending)
            .Include(p => p.RequestedBy)
            .ProjectTo<EquipmentResponseDTO>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }


        public async Task<string> CreateEquipmentPublishRequest(int id, EquipmentDTO equipmentDto)
        {

            if (equipmentDto == null)
                throw new ArgumentException("Equipment does not exist.");

            var user = await _context.Users.FindAsync(equipmentDto.UserID);

            if (user == null)
                throw new ArgumentException("User doesn't exist!");

            if (equipmentDto.Image == null || equipmentDto.Image.Length == 0)
                throw new ArgumentException("Invalid file!");

            var imageUrl = await SaveImage(equipmentDto.Image);

            var equipmentRequest = _mapper.Map<EquipmentPublishRequest>(equipmentDto);
            equipmentRequest.RequestedBy = user;
            equipmentRequest.ImageUrl = imageUrl;

            _context.EquipmentPublishRequests.Add(equipmentRequest);
            await _context.SaveChangesAsync();

            return "Equipment publish request is succesfully sent!";
        }

        public async Task<string> AcceptEquipmentPublishRequest(int id, string status)
        {
            var request = await _context.EquipmentPublishRequests.FirstOrDefaultAsync(r => r.ID == id);

            if (request == null)
                throw new ArgumentException("Request doesn't exist!");

            if (status == "Approved")
            {
                request.Status = RequestStatus.Approved;
                var equipemnt = _mapper.Map<EquipmentDTO>(request);

                await _equipmentService.PublishEquipment(equipemnt);
                await _context.SaveChangesAsync();
                return "Equipment publish request is approved, new Equipment is created!";
            }

            else
            {
                request.Status = RequestStatus.Rejected;
                await _context.SaveChangesAsync();
                return "Equipment publish request is rejected!";
            }

        }

        public async Task<string> SaveImage(IFormFile image)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            if (!allowedExtensions.Contains(Path.GetExtension(image.FileName).ToLower()))
                throw new Exception("Invalid file type");

            if (image.Length > 5 * 1024 * 1024)
                throw new Exception("File too large");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            var imageUrl = $"/images/{fileName}";
            return imageUrl;
        }
    }
}