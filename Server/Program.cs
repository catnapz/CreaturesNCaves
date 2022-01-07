using System.Linq;
using System.Threading.Tasks;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL;
using CreaturesNCaves.Server.GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

var  CorsDevPolicy = "_corsDevPolicy";

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var projectId = builder.Configuration.GetSection("Firebase")["ProjectId"];
        var domain = $"https://securetoken.google.com/{projectId}";

        options.Authority = domain;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = domain,
            ValidateAudience = true,
            ValidAudience = projectId,
            ValidateLifetime = true
        };
    });

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DBConnectionString"));
});

builder.Services.AddGraphQLServer()
    .AddQueryType<QueryType>()
    .AddMutationType<MutationType>()
    .AddType<UserType>()
    .AddType<CampaignType>()
    .AddAuthorization()
    .AddErrorFilter<ErrorFilter>()
    .AddHttpRequestInterceptor((httpContext, _, queryBuilder, cancellationToken) =>
    {
        if (cancellationToken.IsCancellationRequested) return ValueTask.FromCanceled(cancellationToken);
        queryBuilder.AddProperty("currentUserId", "unauthorized");
        if (!httpContext.User.Identity!.IsAuthenticated) return ValueTask.CompletedTask;
        var userIdClaim = httpContext.User.Claims.Single(claim => claim.Type == "user_id");
        var userId = userIdClaim.Value;
        queryBuilder.SetProperty("currentUserId", userId);
        return ValueTask.CompletedTask;
    });

builder.Services.AddControllers();

// In production, the React files will be served from this directory
builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = "../ClientApp/build"; });

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsDevPolicy,
        policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

// Build app
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors(CorsDevPolicy);
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL("/api");

    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
});

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "../ClientApp";

    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});

app.Run();