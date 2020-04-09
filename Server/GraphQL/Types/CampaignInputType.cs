using HotChocolate.Types;
using CreaturesNCaves.EntityFramework.Models;

namespace CreaturesNCaves.Server.GraphQL.Types
{
    public class CampaignInputType : InputObjectType<Campaign>
    {
        protected override void Configure(IInputObjectTypeDescriptor<Campaign> descriptor)
        {
            Name = "CampaignInputType";
            Description = "Campaign Input";
            
            base.Configure(descriptor);
            descriptor.Field(f => f.Name).Type<NonNullType<StringType>>();
            descriptor.Field(f => f.Description).Type<StringType>();
            descriptor.Field(f => f.CampaignId).Ignore();
            descriptor.Field(f => f.UserId).Ignore();
            descriptor.Field(f => f.User).Ignore();;
        }
    }
}