using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EntityFramework.Models
{
    public partial class UserClaim : IdentityUserClaim<int>
    {
        public virtual User User { get; set; }
    }
}
