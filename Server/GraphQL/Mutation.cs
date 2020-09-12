using System;
using System.Threading.Tasks;
using HotChocolate;
using CreaturesNCaves.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Npgsql;

namespace CreaturesNCaves.Server.GraphQL
{
    public class Mutation
    {
        public async Task<Campaign> CreateCampaign(
            [Service] DatabaseContext dbContext,
            [GlobalState] string currentUserId,
            Campaign campaignInput
        )
        {
            var campaignEntry = await dbContext.Campaigns.AddAsync(new Campaign()
            {
                UserId = currentUserId,
                Name = campaignInput.Name,
                Description = campaignInput.Description ?? ""
            });
            await dbContext.SaveChangesAsync();
            return campaignEntry.Entity;
        }

        public async Task<User> CreateUser(
            [Service] DatabaseContext dbContext,
            [GlobalState] string currentUserId,
            User userInput
        )
        {
            try
            {
                if (userInput.UserId.Equals(currentUserId))
                {
                    var userEntry = await dbContext.Users.AddAsync(userInput);
                    await dbContext.SaveChangesAsync();
                    return userEntry.Entity;   
                }
            }
            catch (DbUpdateException e)
            {
                var sqlException = (PostgresException) e.InnerException;
                if (sqlException!.SqlState.Equals("23505"))
                {
                    // User already exists
                    return userInput;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return await Task.FromResult<User>(null);
        }
    }
}