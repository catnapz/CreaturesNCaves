namespace CreaturesNCaves.Server.Controllers.Models
{
    public interface IRegisterData : IUserData
    {
        public string Email { get; set; }
    }
}