using Books.Models;
using Microsoft.AspNetCore.Mvc;

namespace Books.Services.Interfaces
{
    public interface IBooksServices
    {
        BookModel Create(BookModel model);
        BookModel Update(BookModel model);
        BookModel Get(int id);
        IEnumerable<BookModel> Get();
        void Delete(int id);
    }
}
