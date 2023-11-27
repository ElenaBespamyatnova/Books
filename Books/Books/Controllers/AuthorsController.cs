using Books.Models;
using Books.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Books.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private IAuthorsServices _authorsService;

        public AuthorsController(IAuthorsServices authorsService)
        {
            _authorsService = authorsService;
        }

        [HttpPost]
        public AuthorModel Create(AuthorModel model)
        {
            return _authorsService.Create(model);
        }
        [HttpPatch]
        public AuthorModel Update(AuthorModel model)
        {
            return _authorsService.Update(model);
        }
        [HttpGet("{id}")]
        public AuthorModel Get(int id)
        {
            return _authorsService.Get(id);
        }
        [HttpGet]
        public IEnumerable<AuthorModel> GetAll()
        {
            return _authorsService.Get();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _authorsService.Delete(id);

            return Ok();
        }
    }
}
