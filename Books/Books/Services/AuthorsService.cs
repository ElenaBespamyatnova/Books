using Books.Data;
using Books.Models;
using Books.Services.Interfaces;

namespace Books.Services
{
    public class AuthorsService : IAuthorsServices
    {
        private IDataContext _dataContext;
        public AuthorsService(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public AuthorModel Create(AuthorModel model)
        {
            var lastAuthor = _dataContext.Authors.OrderBy(a => a.Id).LastOrDefault();
            int newId = lastAuthor is null ? 1 : lastAuthor.Id + 1;

            model.Id = newId;
            _dataContext.Authors.Add(model);
            return model;
        }

        public void Delete(int id)
        {
            var deleteModel = _dataContext.Authors.FirstOrDefault(m => m.Id == id);
            _dataContext.Authors.Remove(deleteModel);
        }

        public AuthorModel Get(int id)
        {
            return _dataContext.Authors.FirstOrDefault(m => m.Id == id);
        }

        public List<AuthorModel> Get()
        {
            return _dataContext.Authors.ToList();
        }

        public AuthorModel Update(AuthorModel model)
        {
            var updateModel = _dataContext.Authors.FirstOrDefault(m => m.Id == model.Id);
            updateModel.Name = model.Name;
            updateModel.Surname = model.Surname;
            updateModel.BirthDate = model.BirthDate;

            return updateModel;
        }
    }
}
