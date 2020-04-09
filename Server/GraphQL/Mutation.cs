using System.Threading.Tasks;
using HotChocolate;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL.Types;

namespace CreaturesNCaves.Server.GraphQL
{
    public class Mutation
    {

        public async Task<Campaign> CreateCampaign(
            [Service] DatabaseContext dbContext,
            [GlobalState] string currentUserId,
            Campaign campaignInput
            
        )
        {
            var campaignEntry = await dbContext.Campaigns.AddAsync(new Campaign()
            {
                UserId = currentUserId,
                Name = campaignInput.Name,
                Description = campaignInput.Description ?? ""
            });
            await dbContext.SaveChangesAsync();
            return campaignEntry.Entity; 
        }
    }
}