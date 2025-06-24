using Backend.Context;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using AutoMapper;

namespace Backend.Services
{
    public class AuthorizationService
    {

        private readonly AppDbContext _context;
         private readonly IMapper _mapper;

         private readonly JwtService _jwtService;
        public AuthorizationService(IMapper mapper,AppDbContext context,JwtService jwtService)
        {
            _context = context;
            _mapper=mapper;
            _jwtService=jwtService;
        }

        public async Task<UserResponseDTO> Register(User user)
        {
            if (user == null)
                throw new ArgumentException("Invalid user data");

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
            if (existingUser != null)
                throw new ArgumentException("User with that username already exists");

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            string token = _jwtService.GenerateJwtToken(user.Username, user.Role.ToString()); 
            var userId=user.ID;
    
            var userResponse=_mapper.Map<UserResponseDTO>(user);
            userResponse.Token=token;
         
            return userResponse; 
        }

        public async Task<UserResponseDTO> Login(UserDTO userDto)
        {
            if (userDto == null)
                throw new ArgumentException("Invalid user data");

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (existingUser == null)
                throw new ArgumentException("User with that Email address does no exist!");

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(userDto.Password, existingUser.Password);

            if(!isPasswordValid)
                 throw new UnauthorizedAccessException("Invalid password");

            string token = _jwtService.GenerateJwtToken(existingUser.Username, existingUser.Role.ToString()); 
     

            var user=_mapper.Map<UserResponseDTO>(existingUser);
            user.Token=token;

            return user;
        }
    }
}