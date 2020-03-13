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
    // GetCampaigns: Return a list of all Campaigns
    // Notice the [Service]. It's an auto hook up from HotChocolate
    public async Task<List<Campaign>> GetAllCampaigns([Service] DatabaseContext dbContext) =>
      await dbContext
        .Campaigns
        .AsNoTracking()
        .OrderBy(campaignName => campaignName.Name)
        .ToListAsync();

    // GetCampaign: Return a list of Campaigns by userId
    public async Task<List<Campaign>> GetCampaignByUserId([Service] DatabaseContext dbContext, string userId) =>
      await dbContext
        .Campaigns
        .AsNoTracking()
        .Where(campaign => campaign.UserId == userId)
        .OrderBy(campaignName => campaignName.Name)
        .ToListAsync();
  }
}