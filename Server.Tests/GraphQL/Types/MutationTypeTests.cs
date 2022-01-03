using System.Collections.Generic;
using CreaturesNCaves.Server.GraphQL.Types;
using HotChocolate;
using Xunit;

namespace CreaturesNCaves.Server.Tests.GraphQL.Types
{
    public class MutationTypeTests
    {
        private readonly MutationType _mutationType;

        private readonly IList<string> _expectedFields;
        
        public MutationTypeTests()
        {
            
            var schema = SchemaBuilder.New()
                .AddAuthorizeDirectiveType()
                .AddType<MutationType>()
                .ModifyOptions(o => o.StrictValidation = false)
                .Create();

            _mutationType = schema.GetType<MutationType>("Mutation");

            _expectedFields = new List<string>()
            {
                "createCampaign"
            };
        }
        
        [Fact]
        public void ContainsExpectedFields()
        {
            var actualFields = _mutationType.Fields;
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