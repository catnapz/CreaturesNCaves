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
            
            descriptor.Field(f => f.CreateUser(default, default, default))
                .Type<NonNullType<UserType>>()
                .Argument("userInput", a => a.Type<NonNullType<UserInputType>>())
                .Authorize();
        }
    }
}