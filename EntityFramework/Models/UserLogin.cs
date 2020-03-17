using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EntityFramework.Models
{
    public partial class UserLogin : IdentityUserLogin<string>
    {
        public virtual User User { get; set; }
    }
}
