using System.Collections.Generic;
using CreaturesNCaves.Server.GraphQL.Types;
using HotChocolate;
using Xunit;

namespace CreaturesNCaves.Server.Tests.GraphQL.Types
{
    public class QueryTypeTests
    {
        private readonly QueryType _queryType;

        private readonly IList<string> _expectedFields;
        
        public QueryTypeTests()
        {
            Schema schema = Schema.Create(c =>
            {
                c.RegisterAuthorizeDirectiveType();
                c.RegisterQueryType<QueryType>();
                c.Options.StrictValidation = false;
            });
            _queryType = schema.GetType<QueryType>("Query");

            _expectedFields = new List<string>()
            {
                "me", "user", "users", "allCampaigns"
            };
        }
        
        [Fact]
        public void ContainsExpectedFields()
        {
            var actualFields = _queryType.Fields;
            var passed = true;
            // Arrange
            foreach (var field in _expectedFields)
            {
                // Act
                if (actualFields.ContainsField(field)) continue;
                passed = false;
                break;
            }
            // Assert
            Assert.True(passed);
        }
    }
}