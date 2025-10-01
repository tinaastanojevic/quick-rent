using Backend.Context;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentalRequestController : ControllerBase
    {
        private readonly RentalRequestService _rentalRequestService;

        public RentalRequestController(RentalRequestService rentalRequestService)
        {
            _rentalRequestService = rentalRequestService;
        }

        [HttpPost("sendRentalRequest")]
        [Authorize(Roles = "Customer,Owner,Admin")]
        public async Task<IActionResult> SendRentalRequest([FromBody] RentalRequestDTO rentalRequestDto)
        {
            try
            {
                var res = await _rentalRequestService.SendRentalRequest(rentalRequestDto);
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


        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRentalRequests(int id)
        {
            try
            {
                var res = await _rentalRequestService.GetRentalRequests(id);
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

        [HttpGet("getWithSpecificStatus/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRentalRequestsWithSpecificStatus(int id, [FromQuery] string status)
        {
            try
            {
                var res = await _rentalRequestService.GetRentalRequestsWithSpecificStatus(id,status);
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

        [HttpPatch("{id}")]
        [Authorize(Roles = "Owner,Admin")]
        public async Task<IActionResult> ApproveOrRejectRentalRequest(int id, [FromBody] UpadeteStatusDto status)
        {
            try
            {
                var res = await _rentalRequestService.ApproveOrRejectRentalRequest(id, status.Status);
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