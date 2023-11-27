using Books.Models;
using Microsoft.EntityFrameworkCore;

namespace Books.Data
{
    public interface IDataContext : IDisposable
    {
        public DbSet<BookModel> Books { get; set; }
        public DbSet<AuthorModel> Authors { get; set; }
        public void Save(DataContext context);
    }
}
