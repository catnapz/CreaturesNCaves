using System.Collections.Generic;
using CreaturesNCaves.Server.GraphQL.Types;
using HotChocolate;
using Xunit;

namespace CreaturesNCaves.Server.Tests.GraphQL.Types
{
    public class UserTypeTests
    {
        private readonly UserType _userType;

        private readonly IList<string> _expectedFields;
        private readonly IList<string> _expectedIgnoredFields;
        
        public UserTypeTests()
        {
            Schema schema = Schema.Create(c =>
            {
                c.RegisterAuthorizeDirectiveType();
                c.RegisterType<UserType>();
                c.Options.StrictValidation = false;
            });
            _userType = schema.GetType<UserType>("User");

            _expectedFields = new List<string>()
            {
                "name", "description", "campaigns", "campaign",
            };
            
            _expectedIgnoredFields = new List<string>()
            {
                "passwordHash", "securityStamp"
            };
        }
        
        [Fact]
        public void ContainsExpectedFields()
        {
            var actualFields = _userType.Fields;
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
        
        [Fact]
        public void DoesNotContainIgnoredFields()
        {
            var actualFields = _userType.Fields;
            var passed = true;
            // Arrange
            foreach (var field in _expectedIgnoredFields)
            {
                // Act
                if (!actualFields.ContainsField(field)) continue;
                passed = false;
                break;
            }
            // Assert
            Assert.True(passed);
        }
    }
}