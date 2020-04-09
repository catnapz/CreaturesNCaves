using System.Collections.Generic;
using Xunit;
using CreaturesNCaves.Server.GraphQL.Types;
using HotChocolate;

namespace CreaturesNCaves.Server.Tests.GraphQL.Types
{
    public class CampaignTypeTests
    {
        private readonly CampaignType _campaignType;

        private readonly IList<string> _expectedFields;
        
        public CampaignTypeTests()
        {
            Schema schema = Schema.Create(c =>
            {
                c.RegisterAuthorizeDirectiveType();
                c.RegisterType<CampaignType>();
                c.Options.StrictValidation = false;
            });
            _campaignType = schema.GetType<CampaignType>("Campaign");

            _expectedFields = new List<string>()
            {
                "campaignId", "name", "userId", "description"
            };
        }
        
        [Fact]
        public void ContainsExpectedFields()
        {
            var actualFields = _campaignType.Fields;
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