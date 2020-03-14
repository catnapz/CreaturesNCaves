using Server.Controllers;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Xunit;
using Moq;
using FluentAssertions;

namespace Server.Tests.Controllers
{
    public class HealthCheckControllerTests: ControllerBase
    {
        [Fact]
        public void Get_ReturnType()
        {
            // Arrange
            var logger = Mock.Of<ILogger<HealthCheckController>>();
            var controller = new HealthCheckController(logger);
            
            // Act
            var result = controller.Get();

            // Assert
            var okResult = Assert.IsType<OkResult>(result);

        }

        [Fact]
        public void Get_ReturnsOk()
        {
            // Arrange
            var logger = Mock.Of<ILogger<HealthCheckController>>();
            var controller = new HealthCheckController(logger);
            
            // Act
            var actual = controller.Get();
            var expected = Ok();
            
            // Assert
            actual.Should().BeEquivalentTo( expected );

        }
    }
}
