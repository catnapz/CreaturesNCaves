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

      descriptor.Field(t => t.UserId).Type<NonNullType<IdType>>();

      descriptor.Field(t => t.Username).Type<NonNullType<StringType>>();

      descriptor.Field(t => t.Name);

      descriptor.Field(t => t.Description);

      descriptor.Field(t => t.Campaigns);
      
      descriptor.Field(t => t.HashedPassword).Ignore();
      
      descriptor.Field<UserResolvers>(r => r.GetCampaigns(default))
          .Name("campaigns");

      descriptor.Field<UserResolvers>(r => r.GetCampaign(default, default))
          .Argument("campaignId", a => a.Type<NonNullType<IdType>>())
          .Name("campaign");
    }
  }
}
