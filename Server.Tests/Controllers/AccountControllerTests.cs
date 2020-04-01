using System;
using System.Threading.Tasks;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.Controllers;
using CreaturesNCaves.Server.Controllers.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace CreaturesNCaves.Server.Tests.Controllers
{
    public class AccountControllerTests : IDisposable
    {
        private UserManager<User> UserManager { get; set; }
        private SignInManager<User> SignInManager { get; set; }
        private RoleManager<IdentityRole> RoleManager { get; set; }
        private ILogger<AccountController> Logger { get; set; }
        private RegisterInput RegisterInput { get; set; }

        private AccountController AccountController => new AccountController(UserManager, SignInManager,
            Logger, RoleManager);

        public AccountControllerTests()
        {
            #region MockIdentity
            
            var mockUserManager = new Mock<UserManager<User>>
            (
                Mock.Of<IUserStore<User>>(),
                Mock.Of<IOptions<IdentityOptions>>(),
                Mock.Of<IPasswordHasher<User>>(),
                new IUserValidator<User>[0],
                new IPasswordValidator<User>[0],
                Mock.Of<ILookupNormalizer>(),
                Mock.Of<IdentityErrorDescriber>(),
                Mock.Of<IServiceProvider>(),
                Mock.Of<ILogger<UserManager<User>>>()
            );

            mockUserManager.Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            
            mockUserManager.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            
            var mockSignInManager = new Mock<SignInManager<User>>
            (
                mockUserManager.Object,
                Mock.Of<IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(),
                Mock.Of<IOptions<IdentityOptions>>(),
                Mock.Of<ILogger<SignInManager<User>>>(),
                Mock.Of<IAuthenticationSchemeProvider>(),
                Mock.Of<IUserConfirmation<User>>()
            );

            var mockRoleManager = new Mock<RoleManager<IdentityRole>>
            (
                Mock.Of<IRoleStore<IdentityRole>>(),
                new IRoleValidator<IdentityRole>[0],
                Mock.Of<ILookupNormalizer>(),
                Mock.Of<IdentityErrorDescriber>(),
                Mock.Of<ILogger<RoleManager<IdentityRole>>>()
            );

            mockRoleManager.Setup(x => x.RoleExistsAsync(It.IsAny<string>()))
                .ReturnsAsync(true);
            
            mockRoleManager.Setup(x => x.CreateAsync(It.IsAny<IdentityRole>()))
                .ReturnsAsync(IdentityResult.Success);

            #endregion
            
            UserManager = mockUserManager.Object;
            SignInManager = mockSignInManager.Object;
            RoleManager = mockRoleManager.Object;
            Logger = Mock.Of<ILogger<AccountController>>();
            RegisterInput = Mock.Of<RegisterInput>();
            Mock.Get(RegisterInput).Setup(x => x.IsValid()).Returns(true);
        }
        
        [Fact]
        public void Constructor_ThrowsArgumentNull_UserManager()
        {
            // Arrange, Act, and Assert
            Assert.Throws<ArgumentNullException>(() => new AccountController(null, SignInManager,
                Logger, RoleManager));
        }

        [Fact]
        public void Constructor_ThrowsArgumentNull_SignInManager()
        {
            // Arrange, Act, and Assert
            Assert.Throws<ArgumentNullException>(() => new AccountController(UserManager, null,
                Logger, RoleManager));
        }

        [Fact]
        public void Constructor_ThrowsArgumentNull_Logger()
        {
            // Arrange, Act, and Assert
            Assert.Throws<ArgumentNullException>(() => new AccountController(UserManager, SignInManager,
                null, RoleManager));
        }
        
        [Fact]
        public void Constructor_ThrowsArgumentNull_RoleManager()
        {
            // Arrange, Act, and Assert
            Assert.Throws<ArgumentNullException>(() => new AccountController(UserManager, SignInManager,
                Logger, null));
        }

        [Fact]
        public void Get_Returns_OkObjectResult()
        {
            // Arrange
            var sut = AccountController;
            
            // Act
            var result = sut.Get();
            var okObjectResult = result as OkObjectResult;
            
            // Assert
            Assert.NotNull(okObjectResult);
            okObjectResult.Value.Should().BeEquivalentTo(new { msg = "Account"});
        }

        [Fact]
        public async Task Register_ThrowsNullArgument_RegisterInput()
        {
            // Arrange
            var sut = AccountController;

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(() => sut.Register(null));
        }
        
        [Fact]
        public void Register_ValidatesInput()
        {
            // Arrange
            var mockRegisterInput = Mock.Of<RegisterInput>();
            mockRegisterInput.Email = "test@email.com";
            mockRegisterInput.UserName = "test";
            mockRegisterInput.Password = "test";
            
            var sut = AccountController;
            
            // Act
            sut.Register(mockRegisterInput);
            
            // Assert
            Mock.Get(mockRegisterInput).Verify(x => x.IsValid(), Times.Once());
        }

        [Fact]
        public async Task Register_ValidatesInput_ReturnsStatus400()
        {
            // Arrange
            var invalidInput = Mock.Of<RegisterInput>();
            invalidInput.Email = null;
            invalidInput.UserName = "test";
            invalidInput.Password = "test";
            
            var sut = AccountController;
            
            // Act
            var result = await sut.Register(invalidInput);
            var statusCodeResult = result as StatusCodeResult;
            
            // Assert
            Assert.NotNull(statusCodeResult);
            statusCodeResult.StatusCode.Should().Be(400);
        }
        
        [Fact]
        public void Register_CreatesUserViaUserManager()
        {
            // Arrange
            var sut = AccountController;
            
            // Act
            sut.Register(RegisterInput);
            
            // Assert
           Mock.Get(UserManager).Verify(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()), Times.Once());
        }
        
        [Fact]
        public async Task Register_CreatesUser_ReturnsStatus400()
        {
            // Arrange
            Mock.Get(UserManager).Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Failed());
            var sut = AccountController;
            
            // Act
            var result = await sut.Register(RegisterInput);
            var statusCodeResult = result as StatusCodeResult;
            
            // Assert
            Assert.NotNull(statusCodeResult);
            statusCodeResult.StatusCode.Should().Be(400);
        }
        
        #region IDisposable Support
        private void Dispose(bool disposing)
        {
            if (!disposing) return;
            UserManager = null;
            SignInManager = null;
            RoleManager = null;
            Logger = null;
            RegisterInput = null;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}