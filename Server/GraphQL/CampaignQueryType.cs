using HotChocolate.Types;

namespace Server
{
  public class CampaignQueryType : ObjectType<CampaignQueries>
  {
    protected override void Configure(IObjectTypeDescriptor<CampaignQueries> descriptor)
    {
      base.Configure(descriptor);

      descriptor
        .Field(f => f.GetAllCampaigns(default));

      descriptor
        .Field(f => f.GetCampaignByUserId(default, default))
        .Argument("userId", a => a.Type<StringType>());
    }
  }
}