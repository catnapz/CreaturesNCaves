using System;
using System.Linq;
using System.Threading.Tasks;
using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL.Types;
using HotChocolate;
using HotChocolate.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CreaturesNCaves.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("DBConnectionString"));
            });

            services.AddGraphQL(
                SchemaBuilder.New()
                .AddQueryType<QueryType>()
                .AddMutationType<MutationType>()
                .AddType<UserType>()
                .AddType<CampaignType>()
                .AddAuthorizeDirectiveType()
                .Create());
            
            services.AddQueryRequestInterceptor((httpContext, queryBuilder, cancellationToken) =>
            {;
                if (!httpContext.User.Identity.IsAuthenticated) return Task.CompletedTask;
                
                var userIdClaim = httpContext.User.Claims.Single(claim => claim.Type == "sub");
                var userId = userIdClaim.Value;
                queryBuilder.AddProperty("currentUserId", userId);

                return Task.CompletedTask;
            });

            // services.AddIdentity<User, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
            services.AddIdentity<User, IdentityRole>(options =>
                {
                    // disable password strength, done on client side => then hashed.
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredUniqueChars = 0;
                    options.Password.RequiredLength = 1;
                })
                .AddEntityFrameworkStores<DatabaseContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<User, DatabaseContext>()
                .AddInMemoryIdentityResources(Config.Ids)
                .AddInMemoryApiResources(Config.Apis)
                .AddInMemoryClients(Config.Clients);

            services.AddAuthentication("Bearer")
                .AddIdentityServerJwt();

            services.AddControllers();

            services.ConfigureApplicationCookie(configure => 
            {
               configure.SlidingExpiration = true;
               configure.ExpireTimeSpan = TimeSpan.FromHours(3); 
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
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

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseGraphQL("/api");

            if (env.IsDevelopment())
            {
                app.UsePlayground("/api");
            }

            app.UseEndpoints(endpoints =>
            {
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
