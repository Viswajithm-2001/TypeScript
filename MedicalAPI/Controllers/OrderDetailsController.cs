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
    public class OrderDetailsController : Controller
    {

        private readonly ApplicationDBContext _dbContext;
        public OrderDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
    //Get Details
        public IActionResult GetOrderDetails()
        {
            return Ok(_dbContext.orders.ToList());
        }


        [HttpGet("{id}")]
        public IActionResult GetIndividualOrderDetails(int id)
        {
            var order=_dbContext.orders.FirstOrDefault(order=>order.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult AddOrderDetails([FromBody] OrderDetails order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update Details
        [HttpPut("{id}")]
        public IActionResult UpdateOrderDetails(int id,[FromBody] OrderDetails orderNew)
        {
            var orderOld=_dbContext.orders.FirstOrDefault(order=>order.OrderID==id);
            if(orderOld==null)
            {
                return NotFound();
            }
            
            orderOld.MedicineID = orderNew.MedicineID;
            orderOld.MedicineName = orderNew.MedicineName;
            orderOld.Quantity = orderNew.Quantity;
            orderOld.Price = orderNew.Price;
            orderOld.OrderStatus = orderNew.OrderStatus;
            _dbContext.SaveChanges();
            return Ok();
        }



        // [HttpDelete("{id}")]
        // public IActionResult DeleteMedicine(int id)
        // {
        // var medicine=_dbContext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==id);
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