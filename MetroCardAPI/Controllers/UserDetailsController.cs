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
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserDetails(int id)
        {
            var user = _dbContext.users.FirstOrDefault(m => m.CardID == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUserDetails([FromBody] UserDetails user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutUserDetails(int id, [FromBody] UserDetails user)
        {
            var userOld = _dbContext.users.FirstOrDefault(m => m.CardID == id);
            if (userOld == null)
            {
                return NotFound();
            }
            userOld.UserName = user.UserName;
            userOld.EmailID = user.EmailID;
            userOld.Password = user.Password;
            userOld.PhoneNumber = user.PhoneNumber;
            userOld.Balance = user.Balance;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUserDetails(int id)
        {
            var user = _dbContext.users.FirstOrDefault(m => m.CardID == id);
            if (user == null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}