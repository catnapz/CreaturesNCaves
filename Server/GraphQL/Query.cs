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
        .AsNoTracking()
        .Include(user => user.Campaigns)
        .SingleAsync(user => user.UserId == currentUserId);

    /// <summary>
    /// Return a list of all users
    /// </summary>
    // TODO: Make authorized for admin only
    public async Task<IEnumerable<User>> GetUsers([Service] DatabaseContext dbContext) =>
      await dbContext
        .Users
        .AsNoTracking()
        .Include(user => user.Campaigns)
        .OrderBy(user => user.Name)
        .ToListAsync();

    /// <summary>
    /// Return a user by id
    /// </summary>
    // TODO: Make authorized for admin only
    public async Task<User> GetUser([Service] DatabaseContext dbContext, string userId) =>
      await dbContext
        .Users
        .AsNoTracking()
        .Where(user => user.UserId == userId)
        .Include(user => user.Campaigns)
        .SingleAsync();
    
    /// <summary>
    /// Return a list of all campaigns
    /// </summary>
    // TODO: Make authorized for admin only
    public async Task<IEnumerable<Campaign>> GetAllCampaigns([Service] DatabaseContext dbContext) =>
      await dbContext
        .Campaigns
        .AsNoTracking()
        .OrderBy(campaignName => campaignName.Name)
        .ToListAsync();

  }
}