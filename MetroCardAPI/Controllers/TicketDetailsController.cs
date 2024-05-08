using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetroCardAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace MetroCardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public TicketDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //Get details
        [HttpGet]
        public IActionResult GetTicket()
        {
            return Ok(_dbContext.tickets);
        }

        [HttpGet("{id}")]
        public IActionResult GetTicketDetails(int id)
        {
            var ticket=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }
        //Add details
        [HttpPost]
        public IActionResult AddTicketDetails([FromBody]TicketDetails ticket)
        {
            _dbContext.tickets.Add(ticket);
            _dbContext.SaveChanges();
            return Ok();
        }
        //update details
        [HttpPut("{id}")]
        public IActionResult UpdateTicketDetails(int id, [FromBody]TicketDetails ticket)
        {
            var ticketOld=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticketOld==null)
            {
                return NotFound();
            }
            ticketOld.FromLocation=ticket.FromLocation;
            ticketOld.ToLocation=ticket.ToLocation;
            ticketOld.TicketPrice=ticket.TicketPrice;
            _dbContext.SaveChanges();
            return Ok();
        }

        //delete details
        [HttpDelete("{id}")]
        public IActionResult DeleteTicketDetails(int id)
        {
            var ticket=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
           _dbContext.tickets.Remove(ticket);
           _dbContext.SaveChanges();
            return Ok();
        }
        
    }
}