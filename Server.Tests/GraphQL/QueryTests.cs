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
        private readonly TestBase _base;
        public QueryTests(TestBase testBase)
        {
            _base = testBase;
        }

        [Fact]
        async public void GetUsers_UsersExist()
        {
            using ( var context = _base.DatabaseContext)
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
                var expectedUser = new User { Id = "U1", Description = "UD1", Name = "UN1" };

                // Assert // Don't know best way to do object equality yet
                Assert.Equal(expectedUser.Id, actualUser.Id);
                Assert.Equal(expectedUser.Description, actualUser.Description);
                Assert.Equal(expectedUser.Name, actualUser.Name);
            }
        }
    }
}
