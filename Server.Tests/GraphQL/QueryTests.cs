using System;
using System.Collections.Generic;
using System.Linq;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CreaturesNCaves.Server.Tests.GraphQL
{
    public class QueryTests : IDisposable
    {
        private readonly TestBase _tb;
        public QueryTests()
        {
            _tb = new TestBase("cnc_query_tests");
            using var context = _tb.DatabaseContext;
            context.Users.Add(new User { UserId = "U1", Description = "UD1", Name = "UN1" });
            context.Users.Add(new User { UserId = "U2", Description = "UD2", Name = "UN2" });
            context.Campaigns.Add(new Campaign {CampaignId = 1, Description = "CD1", Name = "CN1", UserId = "U1"});
            context.Campaigns.Add(new Campaign {CampaignId = 2, Description = "CD2", Name = "CN2", UserId = "U2"});
            context.Campaigns.Add(new Campaign {CampaignId = 3, Description = "CD3", Name = "CN3", UserId = "U1"});
            context.SaveChanges();
        }
        
        [Fact]
        public async void GetMe()
        {
            await using var context = _tb.DatabaseContext;
            // Arrange
            var query = new Query();

            // Act
            var me = await query.GetMe(context, "U1");
            var expectedUser = new User { UserId = "U1", Description = "UD1", Name = "UN1" };

            // Assert
            Assert.Equal(expectedUser.UserId, me.UserId);
            Assert.Equal(expectedUser.Description, me.Description);
            Assert.Equal(expectedUser.Name, me.Name);
            Assert.Equal(2, me.Campaigns.Count());
        }

        [Fact]
        public async void GetUser()
        {
            await using var context = _tb.DatabaseContext;
            // Arrange
            var query = new Query();

            // Act
            var actualUser = await query.GetUser(context, "U1");
            var expectedUser = new User { UserId = "U1", Description = "UD1", Name = "UN1" };

            // Assert // Don't know best way to do object equality yet
            Assert.Equal(expectedUser.UserId, actualUser.UserId);
            Assert.Equal(expectedUser.Description, actualUser.Description);
            Assert.Equal(expectedUser.Name, actualUser.Name);
        }
        
        [Fact]
        public async void GetUsers_UsersExist()
        {
            await using var context = _tb.DatabaseContext;
            // Arrange
            var query = new Query();
            IEnumerable<User> users = await query.GetUsers(context);

            // Act & Assert
            Assert.True(users.Any());
        }

        [Fact]
        public async void GetUsers()
        {
            await using var context = _tb.DatabaseContext;
            // Arrange
            var query = new Query();
            IEnumerable<User> users = await query.GetUsers(context);

            // Act
            var actualUser = users.First();
            var expectedUser = new User { UserId = "U1", Description = "UD1", Name = "UN1" };
            
            // Assert 
            Assert.Equal(expectedUser.UserId, actualUser.UserId);
            Assert.Equal(expectedUser.Description, actualUser.Description);
            Assert.Equal(expectedUser.Name, actualUser.Name);
        }
        
        [Fact]
        public async void GetAllCampaigns_Count()
        {
            await using var context = _tb.DatabaseContext;
            // Arrange
            var query = new Query();
            IEnumerable<Campaign> campaigns = await query.GetAllCampaigns(context);

            // Act & Assert
            Assert.Equal(3, campaigns.Count());
        }
        
        [Fact]
        public async void GetAllCampaigns_MatchExpected()
        {
            await using var context = _tb.DatabaseContext;
            // Arrange
            var query = new Query();
            IEnumerable<Campaign> campaigns = await query.GetAllCampaigns(context);

            // Act
            var actualCampaign = campaigns.First();
            var expectedCampaign = new Campaign { CampaignId = 1, Description = "CD1", Name = "CN1", UserId = "U1"};
            
            // Assert
            Assert.Equal(expectedCampaign.CampaignId, actualCampaign.CampaignId);
            Assert.Equal(expectedCampaign.Description, actualCampaign.Description);
            Assert.Equal(expectedCampaign.Name, actualCampaign.Name);
        }

        public void Dispose()
        {
            _tb.Dispose();
        }
    }
}
