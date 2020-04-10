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
        private readonly TestBase _tb;

        public MutationTests()
        {
            _tb = new TestBase("cnc_mutation_tests");
        }

        [Fact]
        public async void CreateCampaign_CreatesCampaign()
        {
            // Arrange
            await using var context = _tb.DatabaseContext;
            var numCampaigns = context.Campaigns.Count();
            var campaignInput = new Campaign
            {
                Name = "New Campaign",
                Description = "Created in Unit Test"
            };
            var mutation = new Mutation();
            
            // Act
            var campaign = await mutation.CreateCampaign(context, "MutationTests User 1", campaignInput);
            var campaigns = context.Campaigns.ToList();
                        
            // Assert
            Assert.Equal(numCampaigns + 1, campaigns.Count);
            Assert.True(string.Equals(campaign.Name, campaigns.Last().Name));
        }
        
        [Fact]
        public async void CreateCampaign_ReturnsCreatedCampaign()
        {
            // Arrange
            await using var context = _tb.DatabaseContext;
            var campaignInput = new Campaign
            {
                Name = "New Campaign",
                Description = "Created in Unit Test"
            };
            var mutation = new Mutation();
            
            // Act
            var campaign = await mutation.CreateCampaign(context, "MutationTests User 2", campaignInput);
                        
            // Assert
            Assert.True(string.Equals("MutationTests User 2", campaign.UserId));
        }

        public void Dispose()
        {
            _tb?.Dispose();
        }
    }
}