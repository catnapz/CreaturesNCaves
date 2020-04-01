using System;
using System.Text.Json;
using System.Threading.Tasks;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.Controllers.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CreaturesNCaves.Server.Controllers
{
  [ApiController]
  [Route("account")]
  public class AccountController : ControllerBase
  {
    private readonly ILogger<AccountController> _logger;
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    // private readonly IEmailSender _emailSender;

    public AccountController(
      UserManager<User> userManager,
      SignInManager<User> signInManager,
      ILogger<AccountController> logger,
      RoleManager<IdentityRole> roleManager
    // IEmailSender emailSender
    )
    {
      _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
      _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
      // _emailSender = emailSender ?? throw new ArgumentNullException(nameof(_emailSender));
    }

    [HttpGet]
    public IActionResult Get()
    {
      return new OkObjectResult(new { msg = "Account" });
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromForm] RegisterInput input)
    {
      _ = input ?? throw new ArgumentNullException(nameof(input));
      
      _logger.LogInformation(JsonSerializer.Serialize(input));
      if (!input.IsValid()) return new StatusCodeResult(400);
      
      var user = new User { UserName = input.UserName, Email = input.Email };
      var createUserResult = await _userManager.CreateAsync(user, input.Password);
      if (!createUserResult.Succeeded) return new StatusCodeResult(400);
      
      if (!_roleManager.RoleExistsAsync("NormalUser").Result)
      {
        var role = new IdentityRole();
        role.Name = "NormalUser";
        var createRoleResult = await _roleManager.CreateAsync(role);
        if (!createRoleResult.Succeeded)
        {
          _logger.LogError("Error while creating role");
          return new StatusCodeResult(500);
        }
      }
      
      await _userManager.AddToRoleAsync(user, "NormalUser");
      // await _userManager.AddClaimsAsync(user, new List<System.Security.Claims.Claim>() {
      //   new System.Security.Claims.Claim("username", user.UserName),
      //   new System.Security.Claims.Claim("name", user.Name),
      //   new System.Security.Claims.Claim("email", user.Email),
      // });
      
      _logger.LogInformation("User created a new account.");
      // var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
      // code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
      // var callbackUrl = Url.Page(
      //   "/Account/ConfirmEmail",
      //   pageHandler: null,
      //   values: new { area = "Identity", userId = user.Id, code = code },
      //   protocol: Request.Scheme);

      // await _emailSender.SendEmailAsync(input.Email, "Confirm your email",
      //     $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

      // if (_userManager.Options.SignIn.RequireConfirmedAccount)
      // {
      //   return RedirectToPage("RegisterConfirmation", new { email = input.Email });
      // } else
      // await _signInManager.SignInAsync(user, isPersistent: false);
      
      return LocalRedirect(Url.Content("~/"));
    }

    [HttpGet("Login")]
    public LocalRedirectResult LoginRedirect()
    {
      return LocalRedirect(Url.Content("~/login"));
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromForm] LoginInput input)
    {
      _ = input ?? throw new ArgumentNullException(nameof(input));
      
      var returnUrl = Url.Content("~/");
      
      if (!input.IsValid()) return new StatusCodeResult(400);
      
      // This doesn't count login failures towards account lockout
      // To enable password failures to trigger account lockout, set lockoutOnFailure: true
      bool persistent = string.Equals(input.RememberMe, "on");
      var result = await _signInManager.PasswordSignInAsync(input.UserName, input.Password, persistent, lockoutOnFailure: false);
      
      if (result.Succeeded)
      {
        _logger.LogInformation($"\n{input.UserName} logged in.\n");
        return LocalRedirect(returnUrl);
      }
      
      // if (result.RequiresTwoFactor)
      // {
      //   return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = input.RememberMe });
      // }
      // if (result.IsLockedOut)
      // {
      //   _logger.LogWarning("User account locked out.");
      //   return RedirectToPage("./Lockout");
      // }
      
      else
      {
        _logger.LogError("Invalid login attempt.");
        return new StatusCodeResult(400);
      }
    }
  
    [Authorize]
    [HttpGet("Logout")]
    public async Task<IActionResult> Logout()
    {
      await _signInManager.SignOutAsync();
      return LocalRedirect(Url.Content("~/"));
    }
  }
}
