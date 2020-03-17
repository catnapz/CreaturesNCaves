using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EntityFramework.Models
{
    public partial class UserRole : IdentityUserRole<string>
    {
        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}
