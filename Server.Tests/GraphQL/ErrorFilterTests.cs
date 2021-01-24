using System.Net;
using CreaturesNCaves.Server.GraphQL;
using Xunit;
using HotChocolate;

namespace CreaturesNCaves.Server.Tests.GraphQL
{

    public class ErrorFilterTests
    {

        private readonly ErrorFilter _errorFilter;
        
        public ErrorFilterTests()
        {
            _errorFilter = new ErrorFilter();
        }
        
        [Fact]
        public void OnError_HandlesUnauthorizedExceptions()
        {
            // Arrange
            IError error = new Error("TestError")
                .WithCode(ErrorCodes.Authentication.NotAuthorized);
            var expectedMessage = "You shall not pass.";
            // Act
            var actualError = _errorFilter.OnError(error);
            // Assert
            Assert.Equal(expectedMessage, actualError.Message);
        }
        
        [Fact]
        public void OnError_HandlesUnauthenticatedExceptions()
        {
            // Arrange
            IError error = new Error("TestError")
                .WithCode(ErrorCodes.Authentication.NotAuthenticated);
            var expectedMessage = "Who are you?";
            // Act
            var actualError = _errorFilter.OnError(error);
            // Assert
            Assert.Equal(expectedMessage, actualError.Message);
        }
    }
}