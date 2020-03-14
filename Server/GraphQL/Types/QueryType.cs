using HotChocolate.Types;

namespace Server.GraphQL.Types
{
  public class QueryType : ObjectType<Query>
  {
    protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
    {
      Name = "Query";
      Description = "GraphQL main query schema.";

      base.Configure(descriptor);

      descriptor
        .Field(f => f.GetUser(default, default))
        .Name("user")
        .Argument("userId", a => a.Type<NonNullType<StringType>>());

      descriptor
        .Field(f => f.GetUsers(default))
        .Name("users");

      descriptor
        .Field(f => f.GetAllCampaigns(default))
        .Name("allCampaigns");
    }
  }
}