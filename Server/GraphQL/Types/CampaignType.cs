using CreaturesNCaves.EntityFramework.Models;
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
        }
    }
}