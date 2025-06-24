

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
    public class EquipmentController : ControllerBase
    {

        private readonly EquipmentService _equipmentService;

        public EquipmentController(EquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEquipmentById(int id)
        {
            var result = await _equipmentService.GetEquipmentById(id);
            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllEquipments()
        {
            try
            {
                var result = await _equipmentService.GetAllEquipments();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("category/{category}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEquipmentsByCategory(string category)
        {
            try
            {
                var result = await _equipmentService.GetEquipmentsByCategory(category);
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Internal server error: " + e.Message);
            }
        }


        [HttpGet("category")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var result = await _equipmentService.GetAllCategories();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Internal server error: " + e.Message);
            }
        }

        [Route("PublishEquipment")]
        [HttpPost]
        public async Task<ActionResult<Equipment>> PublishEquipment([FromBody] EquipmentDTO equipmentDto)
        {
            try
            {
                var result = await _equipmentService.PublishEquipment(equipmentDto);
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