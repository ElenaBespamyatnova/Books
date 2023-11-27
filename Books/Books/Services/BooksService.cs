using Books.Data;
using Books.Models;
using Books.Services.Interfaces;

namespace Books.Services
{
    public class BooksService : IBooksServices
    {
        private IDataContext _dataContext;
        public BooksService(IDataContext dataContext) 
        {
            _dataContext = dataContext;
        }
        public BookModel Create(BookModel model)
        {
            var lastBook  = _dataContext.Books.OrderBy(b => b.Id).LastOrDefault();
            int newId = lastBook is null ? 1 : lastBook.Id + 1;

            model.Id = newId;
            _dataContext.Books.Add(model);            
            return model;
        }

        public void Delete(int id)
        {
            var deleteModel = _dataContext.Books.FirstOrDefault(m => m.Id == id);
            _dataContext.Books.Remove(deleteModel);
        }

        public BookModel Get(int id)
        {
            return _dataContext.Books.FirstOrDefault(m => m.Id == id);
        }

        public IEnumerable<BookModel> Get()
        {
            return _dataContext.Books.ToList();
        }

        public BookModel Update(BookModel model)
        {
            var updateModel = _dataContext.Books.FirstOrDefault(m => m.Id == model.Id);
            updateModel.Title = model.Title;
            updateModel.YearOfPublication = model.YearOfPublication;
            updateModel.Genre = model.Genre;

            return updateModel;
        }
    }
}
