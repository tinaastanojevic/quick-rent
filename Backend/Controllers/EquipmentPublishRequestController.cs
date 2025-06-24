
using System.Threading.Tasks;
using Backend.Context;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentPublishRequestController : ControllerBase
    {
        private readonly EquipmentPublishRequestService _equipmentPublishRequestService;

        public EquipmentPublishRequestController(EquipmentPublishRequestService equipmentPublishRequestService)
        {
            _equipmentPublishRequestService = equipmentPublishRequestService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllEquipmentPublishRequests()
        {
            try
            {
                var result = await _equipmentPublishRequestService.GetAllEquipmentPublishRequests();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("publish/{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public async Task<IActionResult> CreateEquipmentPublishRequest(int id, [FromForm] EquipmentDTO equipmentDto)
        {
            try
            {
                var result = await _equipmentPublishRequestService.CreateEquipmentPublishRequest(id, equipmentDto);
                return Ok(result);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Internal server error: " + e.Message);
            }
        }

        [HttpPatch("changeStatus/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AcceptEquipmentPublishRequest(int id, [FromBody] UpadeteStatusDto status)
        {
            try
            {
                var result = await _equipmentPublishRequestService.AcceptEquipmentPublishRequest(id, status.Status);
                return Ok(result);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Internal server error: " + e.Message);
            }
        }
    }
}