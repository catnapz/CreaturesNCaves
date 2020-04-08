using System.Threading.Tasks;
using HotChocolate;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL.Types;

namespace CreaturesNCaves.Server.GraphQL
{
    public class Mutation
    {

        public async Task<int> CreateCampaign(
            [Service] DatabaseContext dbContext,
            [GlobalState] string currentUserId,
            CampaignInputType campaignInput
            
        )
        {
            var campaignEntry = await dbContext.Campaigns.AddAsync(new Campaign()
            {
                UserId = currentUserId,
                Name = campaignInput.Name,
                Description = campaignInput.Description ?? ""
            });
            return campaignEntry.Entity.CampaignId;
        }
    }
}