using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EntityFramework.Models
{
    public partial class UserToken : IdentityUserToken<string>
    {
        public virtual User User { get; set; }
    }
}
