using System;
using System.Collections.Generic;

namespace CreaturesNCaves.EntityFramework.Models
{
    public partial class User
    {
        public User()
        {
            Campaigns = new HashSet<Campaign>();
        }

        public string UserId { get; set; }
        public string Username { get; set; }
        public string HashedPassword { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Campaign> Campaigns { get; set; }
    }
}
