using Books.Models;
using Books.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Books.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IBooksServices _booksService;

        public BooksController(IBooksServices booksServices)
        {
            _booksService = booksServices;
        }

        [HttpPost]
        public BookModel Create(BookModel model)
        {
           return _booksService.Create(model);
        }
        [HttpPatch]
        public BookModel Update(BookModel model)
        {
            return _booksService.Update(model);
        }
        [HttpGet("{id}")]
        public BookModel Get(int id)
        {
            return _booksService.Get(id);
        }
        [HttpGet]
        public IEnumerable<BookModel> GetAll()
        {
            return _booksService.Get();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           _booksService.Delete(id);
           
            return Ok();    
        }

    }
}
