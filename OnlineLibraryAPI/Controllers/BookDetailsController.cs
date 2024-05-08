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
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }
        
        //get
        [HttpGet]
        public IActionResult GetBookDetails()
        {
            return Ok(_dbContext.books.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetIndividualDetails(int id)
        {
            var book = _dbContext.books.FirstOrDefault(book=>book.BookID==id);
            if(book==null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        //Add book details
        [HttpPost]
        public IActionResult AddBookDetails(BookDetails book)
        {
            return Ok(_dbContext.books.Add(book));
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBookDetails(int id, BookDetails uBook)
        {
            var book1 = _dbContext.books.FirstOrDefault(book=>book.BookID==id);
            if(book1==null)
            {
                return NotFound();
            }
            book1.BookID = uBook.BookID;
            book1.BookName = uBook.BookName;
            book1.AuthorName = uBook.AuthorName;
            book1.BookCount = uBook.BookCount;
            
            _dbContext.SaveChanges();
            return Ok(book1);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteBookDetails(int id)
        {
            var book1 = _dbContext.books.FirstOrDefault(book=>book.BookID==id);
            if(book1==null)
            {
                return NotFound();
            }
            _dbContext.books.Remove(book1);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}