using System.ComponentModel.DataAnnotations;

namespace Application.UserDtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage ="The password must contain digits, small letters and capital letters")]
        public string Password { get; set; }

        [Required]
        public string UserName { get; set; }
    }
}