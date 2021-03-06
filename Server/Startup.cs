using System.Linq;
using System.Threading.Tasks;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL;
using CreaturesNCaves.Server.GraphQL.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace CreaturesNCaves.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var projectId = Configuration.GetSection("Firebase")["ProjectId"];
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
            
            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("DBConnectionString"));
            });
            services.AddGraphQLServer()
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


            services.AddControllers();
            
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "../ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

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

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
