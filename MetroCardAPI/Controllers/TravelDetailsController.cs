using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetroCardAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TravelDetailsController : ControllerBase
    {
       private readonly ApplicationDBContext _dbContext;
        public TravelDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetTravel()
        {
            return Ok(_dbContext.travels);
        }

        [HttpGet("{id}")]
        public IActionResult GetTravelDetails(int id)
        {
            var travel =_dbContext.travels.FirstOrDefault(m=>m.TravelID==id);
            if(travel==null)
            {
                return NotFound();
            }
            return Ok(travel);
        }

        [HttpPost]
        public IActionResult PostTravelDetails([FromBody]TravelDetails travel)
        {
           _dbContext.travels.Add(travel);
           _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutTravelDetails(int id, [FromBody]TravelDetails travel)
        {
            var travelOld=_dbContext.travels.FirstOrDefault(m=>m.TravelID==id);
            if(travelOld==null)
            {
                return NotFound();
            }
            travelOld.CardID=travel.CardID;
            travelOld.FromLocation=travel.FromLocation;
            travelOld.ToLocation=travel.ToLocation;
            travelOld.TravelDate=travel.TravelDate;
            travel.TravelCost=travel.TravelCost;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTravelDetails(int id)
        {
            var travel=_dbContext.travels.FirstOrDefault(m=>m.TravelID==id);
            if(travel==null)
            {
                return NotFound();
            }
           _dbContext.travels.Remove(travel);
           _dbContext.SaveChanges();
            return Ok();
        }
    }
}