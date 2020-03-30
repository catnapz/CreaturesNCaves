using IdentityServer4.Models;
using System.Collections.Generic;

namespace Server
{
  public static class Config
  {
    public static IEnumerable<IdentityResource> Ids =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };


    public static IEnumerable<ApiResource> Apis =>
        new ApiResource[]
        {
            new ApiResource("ServerAPI", "Creatures & Caves API")
        };


    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            //SPA client using code flow + pkce
            new Client
            {
                ClientId = "ClientApp",
                ClientName = "Creatures & Caves frontend",
                ClientUri = "http://localhost:5001",

                AllowedGrantTypes = GrantTypes.Code,
                AllowOfflineAccess = true,
                // RequirePkce = true,
                RequireClientSecret = false,
                RequireConsent = false,

                RedirectUris =
                {
                    "https://localhost:5001/authentication/login-callback",
                    "https://localhost:5001/silentrenew.html",
                },
                PostLogoutRedirectUris = { "https://localhost:5001/authentication/logout-callback" },
                AllowedCorsOrigins = { "https://localhost:5002" },

                AllowedScopes = { "openid", "profile", "ServerAPI" }
            }
        };
    }
}