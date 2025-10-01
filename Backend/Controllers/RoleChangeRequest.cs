using Backend.Context;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleChangeRequestController : ControllerBase
    {

        private readonly RoleChangeRequestService _roleChangeRequestService;

        public RoleChangeRequestController(RoleChangeRequestService roleChangeRequestService)
        {
            _roleChangeRequestService = roleChangeRequestService;
        }

        [HttpPost("sendRoleChangeRequest")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> SendRoleChangeRequest([FromBody] RoleChangeRequestDTO request)
        {
            try
            {
                var res = await _roleChangeRequestService.SendRoleChangeRequest(request.UserID);
                return Ok(res);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllRoleChangeRequests()
        {
            try
            {
                var res = await _roleChangeRequestService.GetAllRoleChangeRequests();
                return Ok(res);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        
        [HttpPatch]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> HandleRoleChangeRequest([FromBody]UpdateRoleRequest roleRequest)
        {
             try
            {
                var res = await _roleChangeRequestService.HandleRoleChangeRequest(roleRequest.RequestId,roleRequest.Status);
                return Ok(res);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }

}