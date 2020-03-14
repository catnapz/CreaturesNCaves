using System;
using System.Collections.Generic;
using System.Linq;
using EntityFramework.Models;
using Xunit;
using Server.GraphQL;

namespace Server.Tests.GraphQL
{
    public class QueryTests : IClassFixture<TestBase>
    {
        readonly TestBase _base;
        public QueryTests(TestBase testBase)
        {
            _base = testBase;
        }

        [Fact]
        async public void GetUsers_UsersExist()
        {
            using ( var context = _base.DatabaseContext )
            {
                // Arrange
                var query = new Query();
                IEnumerable<User> users = await query.GetUsers(context);

                // Act
                
                // Assert
                Assert.True(users.Any());
            }
        }

        [Fact]
        async public void GetUsers()
        {
            using ( var context = _base.DatabaseContext )
            {
                // Arrange
                var query = new Query();
                IEnumerable<User> users = await query.GetUsers(context);

                // Act
                User actualUser = users.First();
                var expectedUser = new User 
                { 
                    UserId = "1",
                    Username = "username1",
                    Name = "User1",
                    Description = "User2",
                    HashedPassword = "1234",
                    Campaigns = new List<Campaign>(){new Campaign { CampaignId = "1", UserId = "1", Name = "campaign1", Description = "Descrition1" }}
                };

                // Assert // Don't know best way to do object equality yet
                Assert.Equal(expectedUser.UserId, actualUser.UserId);
                Assert.Equal(expectedUser.Campaigns.First().CampaignId, actualUser.Campaigns.First().CampaignId);
                Assert.Equal(expectedUser.Description, actualUser.Description);
            }
        }
    }
}
