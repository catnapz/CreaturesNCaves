using System;
using CreaturesNCaves.Server.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace CreaturesNCaves.Server.Tests.Controllers
{
    public class OidcConfigControllerTests
    {
        [Fact]
        public void Constructor_ThrowsArgumentNull_ClientRequestParameterProvider()
        {
            // Arrange, Act, and Assert
            Assert.Throws<ArgumentNullException>(() => new OidcConfigurationController(null, Mock.Of<ILogger<OidcConfigurationController>>()));
        }
        
        [Fact]
        public void Constructor_ThrowsArgumentNull_Logger()
        {
            // Arrange, Act, and Assert
            Assert.Throws<ArgumentNullException>(() => new OidcConfigurationController(Mock.Of<IClientRequestParametersProvider>(), null));
        }
        
        [Fact]
        public void GetClientRequestParameters_Returns_OkObjectResult()
        {
            // Arrange
            var logger = Mock.Of<ILogger<OidcConfigurationController>>();
            var provider = Mock.Of<IClientRequestParametersProvider>();
            var sut = new OidcConfigurationController(provider, logger);
            
            // Act
            var result = sut.GetClientRequestParameters("test");
            var okResult = result as OkObjectResult;
            
            // Assert
            Assert.NotNull(okResult);
            okResult.StatusCode.Should().Be(200);
        }

    }
}