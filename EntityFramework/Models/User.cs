using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EntityFramework.Models
{
    public partial class User : IdentityUser
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Campaign> Campaigns { get; set; }
    }
}
