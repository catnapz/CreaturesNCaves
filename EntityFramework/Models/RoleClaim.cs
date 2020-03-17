using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EntityFramework.Models
{
    public partial class RoleClaim : IdentityRoleClaim<int>
    {
        public virtual Role Role { get; set; }
    }
}
