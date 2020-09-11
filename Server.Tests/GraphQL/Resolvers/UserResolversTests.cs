using System.Collections.Generic;
using System.Linq;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL.Resolvers;
using Xunit;

namespace CreaturesNCaves.Server.Tests.GraphQL.Resolvers
{
    public class UserResolversTests
    {

        [Fact]
        public void GetCampaigns_GetsUsersCampaigns()
        {
            // Arrange
            var user = new User
            {
                UserId = "U1",
                Campaigns = new List<Campaign>()
                {
                    new Campaign { CampaignId = 1 },
                    new Campaign { CampaignId = 2 }
                }
            };
            var resolver = new UserResolvers();
            
            // Act
            var campaigns = resolver.GetCampaigns(user);
            
            // Assert
            Assert.Equal(2, campaigns.Count());
        }
        
        [Fact]
        public void GetCampaign_GetsCampaignById()
        {
            // Arrange
            var user = new User
            {
                UserId = "U1",
                Campaigns = new List<Campaign>()
                {
                    new Campaign { CampaignId = 1, Name = "Campaign 1" },
                    new Campaign { CampaignId = 2, Name = "Campaign 2" }
                }
            };
            var resolver = new UserResolvers();
            
            // Act
            var campaign = resolver.GetCampaign(user, 2);
            
            // Assert
            Assert.True(string.Equals("Campaign 2", campaign.Name));
        }
    }
}