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
    [ApiController]
    [Route("api/[controller]")]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        [HttpGet]
    //Get Details
        public IActionResult GetUserDetails()
        {
            return Ok(_dbContext.users.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetUserDetails(int id)
        {
            var user=_dbContext.users.FirstOrDefault(user=>user.UserID==id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        // [HttpPut("{id}")]
        // public IActionResult UpdateMedicineDetails(int id,[FromBody] MedicineDetails medicine)
        // {
        //     var medicineOld=_dbContext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==id);
        //     if(medicineOld==null)
        //     {
        //         return NotFound();
        //     }
            
        //     medicineOld.MedicineCount=medicine.MedicineCount;
        //     medicineOld.MedicineName=medicine.MedicineName;
        //     medicineOld.MedicinePrice=medicine.MedicinePrice;
        //     _dbContext.SaveChanges();
        //     return Ok();
        // }

        [HttpPost]
        public IActionResult AddUserDetails([FromBody] UserDetails user)
        {
           _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        // [HttpDelete("{id}")]
        // public IActionResult DeteletuserDetails([FromBody] UserDetails user)
        // {
        //     var user1=_dbContext.users.FirstOrDefault(user1=>medicine.MedicineID==id);
        //     if(medicine==null)
        //     {
        //         return NotFound();
        //     }
        //     _dbContext.medicines.Remove(medicine);
        //     _dbContext.SaveChanges();
        //     return Ok();
        // }
    }
}