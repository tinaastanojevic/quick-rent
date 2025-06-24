using AutoMapper;
using AutoMapper.QueryableExtensions;
using Backend.Context;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class RentalRequestService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public RentalRequestService(IMapper mapper, AppDbContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> SendRentalRequest(RentalRequestDTO rentalRequestDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == rentalRequestDto.UserID);
            if (user == null)
                throw new ArgumentNullException("Bad user ID!");
            var equipemnt = await _context.Equipments.FirstOrDefaultAsync(e => e.ID == rentalRequestDto.EquipmentID);

            if (equipemnt == null)
                throw new ArgumentNullException("Bad equipment ID!");


            var request = _mapper.Map<RentalRequest>(rentalRequestDto);

            _context.RentalRequests.Add(request);
            await _context.SaveChangesAsync();

            return "Request for rental is sent!";
        }

        public async Task<List<RentalRequestResponseDTO>> GetRentalRequests(int userID)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == userID);
            if (user == null)
                throw new ArgumentNullException("Bad user ID!");

            var requests = await _context.RentalRequests
            .Include(e => e.Equipment)
            .Where(r => r.Equipment.UserID == userID)
            .ProjectTo<RentalRequestResponseDTO>(_mapper.ConfigurationProvider)
            .ToListAsync();

            return requests;
        }

        public async Task<string> ApproveOrRejectRentalRequest(int id, string status)
        {
            var request = await _context.RentalRequests.FirstOrDefaultAsync(r => r.ID == id);
            if (request == null)
                throw new ArgumentNullException("Bad request ID!");

            if (status == "Approved")
            {
                request.Status = RequestStatus.Approved;

                var rental = _mapper.Map<Rental>(request);
                _context.Rentals.Add(rental);
                await _context.SaveChangesAsync();
                return "Item is approved!";
            }
            else
            {
                request.Status = RequestStatus.Rejected;
                return "Item is rejected!";
            }

        }

    }
}