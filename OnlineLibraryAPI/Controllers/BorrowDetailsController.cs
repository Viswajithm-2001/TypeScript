using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineLibraryAPI.Data;

namespace OnlineLibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        //get
        [HttpGet]
        public IActionResult GetDetails()
        {
            return Ok(_dbContext.borrows.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetIndividualDetails(int id)
        {
            var book1 = _dbContext.borrows.FirstOrDefault(borrow => borrow.BorrowID == id);
            if(book1==null)
            {
                return NotFound();
            }
            return Ok(book1);
        }

        //Add details
        [HttpPost]
        public IActionResult AddBorrowDetails(BorrowDetails borrow)
        {
            _dbContext.borrows.Add(borrow);
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update details
        [HttpPut("{id}")]
        public IActionResult UpdateBorrowDetails(int id, BorrowDetails borrow)
        {
            var borrow1 = _dbContext.borrows.FirstOrDefault(b1=>b1.BorrowID==id);
            if(borrow1==null)
            {
                return NotFound();
            }
            borrow1.BookID = borrow.BookID;
            borrow1.UserID = borrow.UserID;
            borrow1.BorrowedDate = borrow.BorrowedDate;
            borrow1.BorrowedCount = borrow.BorrowedCount;
            borrow1.Status = borrow.Status;
            borrow1.FineAmount = borrow1.FineAmount;

            _dbContext.SaveChanges();
            return Ok();
        }
        

    }
}