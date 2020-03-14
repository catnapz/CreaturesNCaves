using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using EntityFramework.Models;

namespace Server
{
  public class CampaignQueries
  {
    
    /// <summary>
    /// Return a list of all campaigns
    /// </summary>
    public async Task<List<Campaign>> GetAllCampaigns([Service] DatabaseContext dbContext) =>
      await dbContext
        .Campaigns
        .IgnoreQueryFilters()
        .OrderBy(campaignName => campaignName.Name)
        .ToListAsync();

    /// <summary>
    /// Return a list of all campaigns for a user
    /// </summary>
    public async Task<List<Campaign>> GetCampaignByUserId([Service] DatabaseContext dbContext, string userId) =>
      await dbContext
        .Campaigns
        .AsNoTracking()
        .Where(campaign => campaign.UserId == userId)
        .OrderBy(campaignName => campaignName.Name)
        .ToListAsync();
  }
}