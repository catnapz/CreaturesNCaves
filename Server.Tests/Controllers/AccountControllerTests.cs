using System;
using System.Threading.Tasks;
using EntityFramework.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Xunit;
using Moq;
using Server.Controllers;
using Server.Controllers.Models;

namespace Server.Tests.Controllers
{
    public class AccountControllerTests : IDisposable
    {
        private UserManager<User> UserManager { get; set; }
        private SignInManager<User> SignInManager { get; set; }
        private RoleManager<IdentityRole> RoleManager { get; set; }
        private ILogger<AccountController> Logger { get; set; }

        private AccountController AccountController => new AccountController(UserManager, SignInManager,
            Logger, RoleManager);
        
        public AccountControllerTests()
        {
            UserManager = new MockUserManager();
            SignInManager = new MockSignInManager();
            RoleManager = new MockRoleManager();
            Logger = Mock.Of<ILogger<AccountController>>();
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

        #region IDisposable Support
        protected virtual void Dispose(bool disposing)
        {
            if (!disposing) return;
            UserManager = null;
            SignInManager = null;
            RoleManager = null;
            Logger = null;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }

    #region MockIdentity
    
    public class MockSignInManager : SignInManager<User>
    {
        public MockSignInManager()
            : base(new MockUserManager(),
                Mock.Of<IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(),
                Mock.Of<IOptions<IdentityOptions>>(),
                Mock.Of<ILogger<SignInManager<User>>>(),
                Mock.Of<IAuthenticationSchemeProvider>(),
                Mock.Of<IUserConfirmation<User>>())
        { }        
    }

    public class MockRoleManager : RoleManager<IdentityRole>
    {
        public MockRoleManager()
            : base(Mock.Of<IRoleStore<IdentityRole>>(),
                new IRoleValidator<IdentityRole>[0],
                Mock.Of<ILookupNormalizer>(), 
                Mock.Of<IdentityErrorDescriber>(),
                Mock.Of<ILogger<RoleManager<IdentityRole>>>()
            )
        {}
        
        public override Task<bool> RoleExistsAsync(string roleName)
        {
            return Task.FromResult(true);
        }
        
        public override Task<IdentityResult> CreateAsync(IdentityRole role)
        {
            return Task.FromResult(IdentityResult.Success);
        }
    }
    public class MockUserManager : UserManager<User>
    {
        public MockUserManager()
            : base(Mock.Of<IUserStore<User>>(),
                Mock.Of<IOptions<IdentityOptions>>(),
                Mock.Of<IPasswordHasher<User>>(),
                new IUserValidator<User>[0],
                new IPasswordValidator<User>[0],
                Mock.Of<ILookupNormalizer>(),
                Mock.Of<IdentityErrorDescriber>(),
                Mock.Of<IServiceProvider>(),
                Mock.Of<ILogger<UserManager<User>>>())
        { }

        public override Task<IdentityResult> CreateAsync(User user, string password)
        {
            return Task.FromResult(IdentityResult.Success);
        }

        public override Task<IdentityResult> AddToRoleAsync(User user, string role)
        {
            return Task.FromResult(IdentityResult.Success);
        }

        public override Task<string> GenerateEmailConfirmationTokenAsync(User user)
        {
            return Task.FromResult(Guid.NewGuid().ToString());
        }
    }
    #endregion
}