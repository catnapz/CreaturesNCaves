using System.Text.Json.Serialization;

namespace CreaturesNCaves.Server.Controllers.Models
{
    public class LoginInput : ILoginData
    {
        [JsonPropertyName("username")]
        public string UserName { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }

        [JsonPropertyName("rememberMe")]
        public string RememberMe { get; set; } = "off";

        public virtual bool IsValid()
        {
            return (
                !string.IsNullOrEmpty(this.UserName) &&
                !string.IsNullOrEmpty(this.Password)
            );
        }
    }
}