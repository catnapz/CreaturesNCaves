using System.Text.Json.Serialization;

namespace CreaturesNCaves.Server.Controllers.Models
{
    public class UserToDelete
    {
        [JsonPropertyName("userId")]
        public string UserId { get; set; }
    }
}