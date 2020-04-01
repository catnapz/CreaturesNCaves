using CreaturesNCaves.Server.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using static Xunit.Assert;

namespace CreaturesNCaves.Server.Tests.Controllers
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
            IsType<OkResult>(result);

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
