using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MedicalAPI.Controllers
{
    [Route("api/[controller]")]
    public class UserDetailsController : ControllerBase
    {
        private static List<UserDetails> userList = new List<UserDetails>
        {
            new UserDetails{UserID=1,UserName="Ravi",UserPhoneNumber=987654322,UserBalance=500},
            new UserDetails{UserID=2,UserName="Baskaran",UserPhoneNumber=934578927,UserBalance=500},
            new UserDetails{UserID=3,UserName="Hemanth",UserPhoneNumber=634878745,UserBalance=500}
        };

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(userList);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserDetails(int id)
        {
            var user = userList.Find(m=>m.UserID == id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult PutUserDetails(int id,[FromBody] UserDetails user)
        {
            var index = userList.FindIndex(tempUser=>tempUser.UserID==id);
            if(index<0)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult PostUserDetails([FromBody] UserDetails user)
        {
            userList.Add(user);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeteletuserDetails([FromBody] UserDetails user)
        {
            var index = userList.FindIndex(user1=> user1==user);
            if(index>0)
            {
                userList.Remove(user);
                return Ok();
            }
            return NotFound();
        }
    }
}