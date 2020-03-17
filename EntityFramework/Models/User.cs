using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EntityFramework.Models
{
    public partial class User : IdentityUser
    {
        public User()
        {
            Campaigns = new HashSet<Campaign>();
            UserClaims = new HashSet<UserClaim>();
            UserLogins = new HashSet<UserLogin>();
            UserRoles = new HashSet<UserRole>();
            UserTokens = new HashSet<UserToken>();
        }

        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Campaign> Campaigns { get; set; }
        public virtual ICollection<UserClaim> UserClaims { get; set; }
        public virtual ICollection<UserLogin> UserLogins { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<UserToken> UserTokens { get; set; }
    }
}
