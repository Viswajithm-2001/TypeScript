using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Route("api/[controller]")]
    public class MedicineDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public MedicineDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
    //Get Details
        public IActionResult GetMedicineDetails()
        {
            return Ok(_dbContext.medicines.ToList());
        }
        //Set Details
         [HttpGet("{MedicineID}")]
        public IActionResult GetIndividualMedicineDetails(int medicineID)
        {
            var medicine=_dbContext.medicines.FirstOrDefaultAsync(medicine=>medicine.MedicineID==medicineID);
            if(medicine==null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }
        //Add Details
        [HttpPost]
        public IActionResult AddMedicineDetails([FromBody] MedicineDetails medicine)
        {
            _dbContext.medicines.Add(medicine);
            _dbContext.SaveChanges();
            return Ok();
        }
        //Update Details
        [HttpPut("{MedicineID}")]
        public IActionResult UpdateMedicineDetails(int medicineID,[FromBody] MedicineDetails medicine)
        {
            var medicineOld=_dbContext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==medicineID);
            if(medicineOld==null)
            {
                return NotFound();
            }
            
            medicineOld.MedicineCount=medicine.MedicineCount;
            medicineOld.MedicineName=medicine.MedicineName;
            medicineOld.MedicinePrice=medicine.MedicinePrice;
            _dbContext.SaveChanges();
            return Ok();
        }
        //Delete Details
        [HttpDelete("{MedicineID}")]
        public IActionResult DeleteMedicine(int medicineID)
        {
        var medicine=_dbContext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==medicineID);
            if(medicine==null)
            {
                return NotFound();
            }
            _dbContext.medicines.Remove(medicine);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}