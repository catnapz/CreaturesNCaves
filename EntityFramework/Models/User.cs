using System.Collections.Generic;

namespace CreaturesNCaves.EntityFramework.Models
{
    public partial class User
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Campaign> Campaigns { get; set; }
    }
}
