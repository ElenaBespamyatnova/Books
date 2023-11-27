using Books.Models;

namespace Books.Services.Interfaces
{
    public interface IAuthorsServices
    {
        AuthorModel Create(AuthorModel model);
        AuthorModel Update(AuthorModel model);
        AuthorModel Get(int id);
        List<AuthorModel> Get();
        void Delete(int id);
    }
}
