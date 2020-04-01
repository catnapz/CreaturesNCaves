using System.Text.Json.Serialization;

namespace CreaturesNCaves.Server.Controllers.Models
{
    public class RegisterInput : IRegisterData
    {
        [JsonPropertyName("username")]
        public string UserName { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        public virtual bool IsValid()
        {
            return (
                !string.IsNullOrEmpty(this.UserName) &&
                !string.IsNullOrEmpty(this.Password) &&
                !string.IsNullOrEmpty(this.Email)
            );
        }
    }
}