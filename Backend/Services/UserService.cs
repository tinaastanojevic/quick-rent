using AutoMapper;
using Backend.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public UserService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OwnerProfileInfoDTO> GetOwnersInfo(string username)
        {
            var user = await _context.Users
            .Include(u => u.Equipments)
            .FirstOrDefaultAsync((u) => u.Username == username);

            if (user == null)
            {
                throw new ArgumentException("User doesn't exist!");
            }

            var userDTO = _mapper.Map<OwnerProfileInfoDTO>(user);

            return userDTO;
        }

    }
}