using System;
using System.Collections.Generic;
using System.Linq;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL;
using Xunit;

namespace CreaturesNCaves.Server.Tests.GraphQL
{
    public class QueryTests : IDisposable
    {
        private readonly TestBase _base;
        public QueryTests()
        {
            _base = new TestBase();
            using var context = _base.DatabaseContext;
            context.Users.Add(new User { Id = "U1", Description = "UD1", Name = "UN1" });
            context.Users.Add(new User { Id = "U2", Description = "UD2", Name = "UN2" });
            context.Campaigns.Add(new Campaign {CampaignId = 1, Description = "CD1", Name = "CN1", UserId = "U1"});
            context.Campaigns.Add(new Campaign {CampaignId = 2, Description = "CD2", Name = "CN2", UserId = "U2"});
            context.SaveChanges();
        }

        public void Dispose()
        {
            _base.Dispose();
        }
        
        [Fact]
        public async void GetMe()
        {
            await using var context = _base.DatabaseContext;
            // Arrange
            var query = new Query();

            // Act
            var me = await query.GetMe(context, "U1");
            var expectedUser = new User { Id = "U1", Description = "UD1", Name = "UN1" };

            // Assert
            Assert.Equal(expectedUser.Id, me.Id);
            Assert.Equal(expectedUser.Description, me.Description);
            Assert.Equal(expectedUser.Name, me.Name);
        }

        [Fact]
        public async void GetUser()
        {
            await using var context = _base.DatabaseContext;
            // Arrange
            var query = new Query();

            // Act
            var actualUser = await query.GetUser(context, "U1");
            var expectedUser = new User { Id = "U1", Description = "UD1", Name = "UN1" };

            // Assert // Don't know best way to do object equality yet
            Assert.Equal(expectedUser.Id, actualUser.Id);
            Assert.Equal(expectedUser.Description, actualUser.Description);
            Assert.Equal(expectedUser.Name, actualUser.Name);
        }
        
        [Fact]
        public async void GetUsers_UsersExist()
        {
            await using var context = _base.DatabaseContext;
            // Arrange
            var query = new Query();
            IEnumerable<User> users = await query.GetUsers(context);

            // Act & Assert
            Assert.True(users.Any());
        }

        [Fact]
        public async void GetUsers()
        {
            await using var context = _base.DatabaseContext;
            // Arrange
            var query = new Query();
            IEnumerable<User> users = await query.GetUsers(context);

            // Act
            var actualUser = users.First();
            var expectedUser = new User { Id = "U1", Description = "UD1", Name = "UN1" };

            // Assert // Don't know best way to do object equality yet
            Assert.Equal(expectedUser.Id, actualUser.Id);
            Assert.Equal(expectedUser.Description, actualUser.Description);
            Assert.Equal(expectedUser.Name, actualUser.Name);
        }
        
        [Fact]
        public async void GetAllCampaigns_Count()
        {
            await using var context = _base.DatabaseContext;
            // Arrange
            var query = new Query();
            IEnumerable<Campaign> campaigns = await query.GetAllCampaigns(context);

            // Act & Assert
            Assert.Equal(2, campaigns.Count());
        }
        
        [Fact]
        public async void GetAllCampaigns_MatchExpected()
        {
            await using var context = _base.DatabaseContext;
            // Arrange
            var query = new Query();
            IEnumerable<Campaign> campaigns = await query.GetAllCampaigns(context);

            // Act
            var actualCampaign = campaigns.First();
            var expectedCampaign = new Campaign { CampaignId = 1, Description = "CD1", Name = "CN1", UserId = "U1"};

            // Assert // Don't know best way to do object equality yet
            Assert.Equal(expectedCampaign.CampaignId, actualCampaign.CampaignId);
            Assert.Equal(expectedCampaign.Description, actualCampaign.Description);
            Assert.Equal(expectedCampaign.Name, actualCampaign.Name);
        }
        
    }
}
