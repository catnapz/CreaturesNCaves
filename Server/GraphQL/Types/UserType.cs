using HotChocolate.Types;
using EntityFramework.Models;
using Server.GraphQL.Resolvers;

namespace Server.GraphQL.Types
{
  public class UserType : ObjectType<User>
  {
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
      
      Name = "User";
      Description = "GraphQL user schema.";

      descriptor.Field(t => t.Id).Type<NonNullType<IdType>>().Authorize();

      descriptor.Field(t => t.UserName).Type<NonNullType<StringType>>();
          
      descriptor.Field(t => t.PasswordHash).Ignore();
      // descriptor.Field(t => t.ConcurrencyStamp).Ignore();
      // descriptor.Field(t => t.EmailConfirmed).Ignore();
      // descriptor.Field(t => t.TwoFactorEnabled).Ignore();
      descriptor.Field(t => t.SecurityStamp).Ignore();
      // descriptor.Field(t => t.PhoneNumberConfirmed).Ignore();
      
      descriptor.Field<UserResolvers>(r => r.GetCampaigns(default))
          .Name("campaigns");

      descriptor.Field<UserResolvers>(r => r.GetCampaign(default, default))
          .Argument("campaignId", a => a.Type<NonNullType<IdType>>())
          .Name("campaign");
    }
  }
}
