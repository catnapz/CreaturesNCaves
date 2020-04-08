using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CreaturesNCaves.EntityFramework.Models;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CreaturesNCaves.Server.GraphQL
{
  public class Query
  {

    /// <summary>
    /// Return current user
    /// </summary>
    [Authorize]
    public async Task<User> GetMe(
      [Service] DatabaseContext dbContext,
      [GlobalState] string currentUserId
    ) =>
      await dbContext
        .Users
        .Include(user => user.Campaigns)
        .SingleAsync(user => user.Id == currentUserId);

    /// <summary>
    /// Return a list of all users
    /// </summary>
    public async Task<IEnumerable<User>> GetUsers([Service] DatabaseContext dbContext) =>
      await dbContext
        .Users
        .Include(user => user.Campaigns)
        .OrderBy(user => user.Name)
        .ToListAsync();

    /// <summary>
    /// Return a user by id
    /// </summary>
    public async Task<User> GetUser([Service] DatabaseContext dbContext, string userId) =>
      await dbContext
        .Users
        .Where(user => user.Id == userId)
        .Include(user => user.Campaigns)
        .SingleAsync();
    
    /// <summary>
    /// Return a list of all campaigns
    /// </summary>
    public async Task<IEnumerable<Campaign>> GetAllCampaigns([Service] DatabaseContext dbContext) =>
      await dbContext
        .Campaigns
        .OrderBy(campaignName => campaignName.Name)
        .ToListAsync();

  }
}