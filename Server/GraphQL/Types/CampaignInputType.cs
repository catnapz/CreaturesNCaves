using HotChocolate.Types;
using CreaturesNCaves.EntityFramework.Models;

namespace CreaturesNCaves.Server.GraphQL.Types
{
    public class CampaignInputType : InputObjectType<Campaign>
    {
        protected override void Configure(IInputObjectTypeDescriptor<Campaign> descriptor)
        {
            descriptor.Field(f => f.CampaignId).Ignore();
            descriptor.Field(f => f.UserId).Ignore();
            descriptor.Field(f => f.User).Ignore();
        }
    }
}