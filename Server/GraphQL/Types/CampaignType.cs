using CreaturesNCaves.EntityFramework.Models;
using CreaturesNCaves.Server.GraphQL.Resolvers;
using HotChocolate.Types;

namespace CreaturesNCaves.Server.GraphQL.Types
{
    public class CampaignType : ObjectType<Campaign>
    {
        protected override void Configure(IObjectTypeDescriptor<Campaign> descriptor)
        {
      
            Name = "Campaign";
            Description = "GraphQL campaign schema.";

            descriptor.Field(t => t.CampaignId).Type<NonNullType<IdType>>().Authorize();
            descriptor.Field(t => t.UserId).Type<NonNullType<IdType>>().Authorize();
            descriptor.Field(t => t.Name).Type<NonNullType<StringType>>();
            descriptor.Field(t => t.Description);

            descriptor.Field<UserResolvers>(r => r.GetCampaigns(default))
                .Name("campaigns");

            descriptor.Field<UserResolvers>(r => r.GetCampaign(default, default))
                .Argument("campaignId", a => a.Type<NonNullType<IdType>>())
                .Name("campaign");
        }
    }
}