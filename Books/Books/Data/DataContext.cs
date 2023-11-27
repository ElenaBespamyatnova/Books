using Books.Models;
using Microsoft.EntityFrameworkCore;

namespace Books.Data
{
    public class DataContext : DbContext, IDataContext
    {
        public DbSet<BookModel> Books { get; set; }
        public DbSet<AuthorModel> Authors { get; set; }
        //public DataContext()
        //{
        //    Database.EnsureDeleted();
        //    Database.EnsureCreated();
        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=Books;Trusted_Connection=True;");
        }

        public void Save(DataContext context)
        {
            context.SaveChanges();
        }
    }
}
