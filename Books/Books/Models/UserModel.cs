using System.ComponentModel.DataAnnotations;

namespace Books.Models
{
    public class UserModel
    {
        public string UserName { get; set; }        
        public string Password { get; set; }        
        public string Name { get; set; }
        public string Surname { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }

    }
}
