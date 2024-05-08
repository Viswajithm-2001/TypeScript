using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineLibraryAPI.Data;

namespace OnlineLibraryAPI.Controllers
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

        //get
        [HttpGet]
        public IActionResult GetDetails()
        {
            return Ok(_dbContext.users.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetIndividualDetails(int id)
        {
            var user = _dbContext.users.FirstOrDefault(user=>user.UserID ==id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //Http Post
        [HttpPost]
        public IActionResult AddUserDetails([FromBody] UserDetails user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        //update user details using put
        [HttpPut("{id}")]
        public IActionResult UpdateUserDetails(int id,[FromBody] UserDetails updatedUser)
        {
            var oldUser = _dbContext.users.FirstOrDefault(user=>user.UserID==id);
            if(oldUser==null)
            {
                return NotFound();
            }
            oldUser.UserName = updatedUser.UserName;
            oldUser.Gender = updatedUser.Gender;
            oldUser.MailID = updatedUser.MailID;
            oldUser.Department = updatedUser.Department;
            oldUser.MobileNumber = updatedUser.MobileNumber;
            oldUser.Password = updatedUser.Password;
            oldUser.Balance = updatedUser.Balance;

            return Ok();
        }

        
    }
}