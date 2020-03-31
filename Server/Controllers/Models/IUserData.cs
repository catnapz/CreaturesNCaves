namespace Server.Controllers.Models
{
    public interface IUserData
    {
        public string UserName { get; set; }

        public string Password { get; set; }
        
        bool IsValid();
    }
}