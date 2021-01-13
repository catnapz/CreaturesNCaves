using HotChocolate.Types;
using CreaturesNCaves.EntityFramework.Models;

namespace CreaturesNCaves.Server.GraphQL.Types
{
    public class UserInputType : InputObjectType<User>
    {
        protected override void Configure(IInputObjectTypeDescriptor<User> descriptor)
        {
            Name = "UserInputType";
            Description = "User Input";
            
            base.Configure(descriptor);
            descriptor.Field(f => f.Name).Type<NonNullType<StringType>>();
            descriptor.Field(f => f.Description).Type<StringType>();
            descriptor.Field(f => f.UserId).Type<NonNullType<StringType>>();
            descriptor.Field(f => f.Campaigns).Ignore();
        }
    }
}