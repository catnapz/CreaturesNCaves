using HotChocolate.Types;

namespace Server
{
  public class CampaignQueryType : ObjectType<CampaignQueries>
  {
    protected override void Configure(IObjectTypeDescriptor<CampaignQueries> descriptor)
    {
      base.Configure(descriptor);

      descriptor
        .Field(f => f.GetAllCampaigns(default))
        .Name("allCampaigns");

      descriptor
        .Field(f => f.GetCampaignByUserId(default, default))
        .Name("campaigns")
        .Argument("userId", a => a.Type<NonNullType<StringType>>());
    }
  }
}