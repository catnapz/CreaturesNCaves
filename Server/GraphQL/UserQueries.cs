using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.AspNetCore.Authorization;
using CreaturesNCaves.EntityFramework.Models;

namespace CreaturesNCaves.Server.GraphQL
{
    
    [ExtendObjectType(Name = "Query")]
    public class UserQueries
    {
        /// <summary>
        /// Gets the currently logged in user.
        /// </summary>
        [Authorize]
        public IQueryable<User> GetMe(
            [GlobalState] string currentUserId,
            [Service] DatabaseContext dbContext) =>
            dbContext
                .Users
                .Include(user => user.Campaigns)
                .Where(user => user.Id == currentUserId);
    }
}