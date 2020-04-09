using HotChocolate.Types;

namespace CreaturesNCaves.Server.GraphQL.Types
{
    public class MutationType: ObjectType<Mutation>
    {
        protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
        {
            descriptor.Field(f => f.CreateCampaign(default, default, default))
                .Type<NonNullType<CampaignType>>()
                .Argument("campaignInput", a => a.Type<NonNullType<CampaignInputType>>())
                .Authorize();
        }
    }
}