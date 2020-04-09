using System.Collections.Generic;
using CreaturesNCaves.EntityFramework.Models;
using Xunit;
using CreaturesNCaves.Server.GraphQL.Types;
using HotChocolate;

namespace CreaturesNCaves.Server.Tests.GraphQL.Types
{
    public class CampaignInputTypeTests
    {
        private CampaignInputType CampaignInputType { get; }

        private readonly IList<string> _expectedFields;
        
        public CampaignInputTypeTests()
        {
            Schema schema = Schema.Create(c =>
            {
                c.RegisterType<CampaignInputType>();
                c.Options.StrictValidation = false;
            });
            CampaignInputType = schema.GetType<CampaignInputType>("CampaignInput");
            
            _expectedFields = new List<string>()
            {
                "name", "description"
            };
        }
        
        [Fact]
        public void ContainsExpectedFields()
        {
            var actualFields = CampaignInputType.Fields;
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