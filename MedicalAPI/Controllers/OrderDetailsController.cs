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
    public class OrderDetailsController : Controller
    {

        private static List<OrderDetails> orderList = new List<OrderDetails>
        {
            new OrderDetails{OrderID = 1,MedicineID=1,MedicineName="Paracetamol",Quantity=2,Price=10,OrderStatus="Ordered"},
            new OrderDetails{OrderID= 2,MedicineID=2,MedicineName="Colpol",Quantity=2,Price=10,OrderStatus="Ordered"},
            new OrderDetails{OrderID= 3,MedicineID=3,MedicineName="Stepsil",Quantity=2,Price=10,OrderStatus="Ordered"}
        };
        [HttpGet]
        public IActionResult Index()
        {
            return Ok(orderList);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderDetails(int id)
        {
            var order = orderList.Find(m=>m.MedicineID == id);
            if(order==null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPut("{id}")]
        public IActionResult PutOrderDetails(int id,[FromBody] OrderDetails order)
        {
            var index = orderList.FindIndex(temporder=>temporder.OrderID==id);
            if(index<0)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult PostOrderDetails([FromBody] OrderDetails order)
        {
            orderList.Add(order);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeteletOrderDetails([FromBody] OrderDetails order)
        {
            var index = orderList.FindIndex(order1=> order1==order);
            if(index>0)
            {
                orderList.Remove(order);
                return Ok();
            }
            return NotFound();
        }
    }
}