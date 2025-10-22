using AutoMapper;
using AutoMapper.QueryableExtensions;
using Backend.Context;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class EquipmentService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public EquipmentService(IMapper mapper, AppDbContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<EquipmentResponseDTO>> GetAllEquipments()
        {
            var equipments = await _context.Equipments
                .Include(o => o.Owner)
                .ProjectTo<EquipmentResponseDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return equipments;
        }

        public async Task<EquipmentResponseDTO> GetEquipmentById(int id)
        {
            var equipment = await _context.Equipments
            .Include(o => o.Owner)
            .ProjectTo<EquipmentResponseDTO>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.ID == id);

            if (equipment == null)
                throw new ArgumentException("Equipment does not exist.");

            return equipment;
        }

        public async Task<List<EquipmentResponseDTO>> GetEquipmentsByCategory(string category)
        {
            var equipments = await _context.Equipments
            .Include(o => o.Owner)
            .Where(x => x.Category == category)
            .ProjectTo<EquipmentResponseDTO>(_mapper.ConfigurationProvider)
            .ToListAsync();
            return equipments;
        }

        public async Task<List<string>> GetAllCategories()
        {
            var equipments = await _context.Equipments.ToListAsync();
            var categories = equipments.Select(c => c.Category).Distinct().ToList();
            return categories;
        }

        public async Task<string> PublishEquipment(EquipmentDTO equipmentDto)
        {
            if (equipmentDto == null)
                throw new ArgumentException("Equipment does not exist.");

            var user = await _context.Users.FindAsync(equipmentDto.UserID);

            if (user == null)
                throw new ArgumentException("User doesn't exist!");

            var equipment = _mapper.Map<Equipment>(equipmentDto);
            equipment.Owner = user;

            _context.Equipments.Add(equipment);
            // await _context.SaveChangesAsync();
             return "Equipment is succesfully published!";
        }

    }
}