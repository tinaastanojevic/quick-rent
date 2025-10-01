using AutoMapper;
using AutoMapper.QueryableExtensions;
using Backend.Context;
using Backend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class RoleChangeRequestService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        private readonly JwtService _jwtService;

        private readonly IHubContext<NotificationHub> _hubContext;
        public RoleChangeRequestService(IMapper mapper, AppDbContext context, IHubContext<NotificationHub> hubContext, JwtService jwtService)
        {
            _context = context;
            _mapper = mapper;
            _hubContext = hubContext;
            _jwtService = jwtService;
        }

        public async Task<string> SendRoleChangeRequest(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == id);
            if (user == null)
                throw new ArgumentNullException("Bad user ID!");

            var req = await _context.RoleChangeRequests.FirstOrDefaultAsync(r => r.UserID == id);
            if (req != null)
            {
                throw new Exception("Role change request is already sent! Please wait for admin to process it.");
            }

            RoleChangeRequest userRequest = new RoleChangeRequest
            {
                UserID = id
            };

            _context.RoleChangeRequests.Add(userRequest);

            await _context.SaveChangesAsync();

            return "Request for role change is sent!";
        }

        public async Task<List<RoleChangeResponseDTO>> GetAllRoleChangeRequests()
        {
            var reqests = await _context.RoleChangeRequests
            .Include(u => u.User)
            .OrderBy(r => r.Status==RequestStatus.Pending ? 0 : 1)
            .ProjectTo<RoleChangeResponseDTO>(_mapper.ConfigurationProvider)
            .ToListAsync();

            return reqests;
        }


        public async Task<string> HandleRoleChangeRequest(int id, RequestStatus status)
        {

            var request = await _context.RoleChangeRequests.FirstOrDefaultAsync(r => r.ID == id);
            if (request != null)
            {
                if (status == RequestStatus.Rejected)
                {
                    request.Status = RequestStatus.Rejected;
                    await _context.SaveChangesAsync();

                    await _hubContext.Clients.User(request.UserID.ToString())
            .SendAsync("ReceiveNotification", $"Your role request is {status}!");

                    return "Request is rejected!";
                }
                else
                {
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == request.UserID);
                    if (user == null)
                        throw new ArgumentNullException("Bad user ID!");

                    user.Role = UserRole.Owner;
                    request.Status = RequestStatus.Approved;
                    await _context.SaveChangesAsync();

                    var newToken = _jwtService.GenerateJwtToken(user.Username, user.Role.ToString(), user.ID);

                    var userResponse = _mapper.Map<UserResponseDTO>(user);
                    userResponse.Token = newToken;

                    Console.WriteLine($"Sending notification to user {request.UserID} with status {status}");


                    await _hubContext.Clients.User(request.UserID.ToString()).SendAsync("ReceiveNotification",
                    new
                    {
                        message = $"Your role request is {status}!",
                        token = newToken
                    });

                    return "Request is approved!";
                }
            }
            throw new ArgumentNullException("No request found!");
        }

    }


}