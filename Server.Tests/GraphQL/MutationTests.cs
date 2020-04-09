using System;
using System.Linq;
using Xunit;
using CreaturesNCaves.Server.GraphQL;
using CreaturesNCaves.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

namespace CreaturesNCaves.Server.Tests.GraphQL
{
    public class MutationTests : IDisposable
    {
        private readonly TestBase _base;

        public MutationTests()
        {
            _base = new TestBase();
        }

        public void Dispose()
        {
            _base.Dispose();
        }
        
        [Fact]
        public async void CreateCampaign_CreatesCampaign()
        {
            // Arrange
            await using var context = _base.DatabaseContext;
            var numCampaigns = await context.Campaigns.CountAsync();
            var campaignInput = new Campaign
            {
                Name = "New Campaign",
                Description = "Created in Unit Test"
            };
            var mutation = new Mutation();
            
            // Act
            var campaign = await mutation.CreateCampaign(context, "U1", campaignInput);
            var campaigns = await context.Campaigns.ToListAsync();
            
            // Assert
            Assert.Equal(numCampaigns + 1, campaigns.Count);
            Assert.True(string.Equals(campaign.Name, campaigns.Last().Name));
        }
        
        [Fact]
        public async void CreateCampaign_ReturnsCreatedCampaign()
        {
            // Arrange
            await using var context = _base.DatabaseContext;
            var campaignInput = new Campaign
            {
                Name = "New Campaign",
                Description = "Created in Unit Test"
            };
            var mutation = new Mutation();
            
            // Act
            var campaign = await mutation.CreateCampaign(context, "U1", campaignInput);
            
            // Assert
            Assert.True(string.Equals("U1", campaign.UserId));
        }
    }
}