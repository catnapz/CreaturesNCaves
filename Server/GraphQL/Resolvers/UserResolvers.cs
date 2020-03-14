using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using HotChocolate;
using EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.GraphQL.Resolvers
{
  public class UserResolvers
  {

    /// <summary>
    /// Return a list of all campaigns
    /// </summary>
    public IEnumerable<Campaign> GetCampaigns([Parent] User user) => user.Campaigns;

    /// <summary>
    /// Return a campaigns by campaignId
    /// </summary>
    public IEnumerable<Campaign> GetCampaign([Parent] User user, string campaignId) => user
        .Campaigns
        .Where(campaign => 
          campaign.UserId == user.UserId && campaign.CampaignId == campaignId
        )
        .OrderBy(campaignName => campaignName.Name)
        .ToList();
  }
}
