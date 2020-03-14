using System;
using EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Tests
{
    public class TestBase : IDisposable
    {
        public DbContextOptions<DatabaseContext> ContextOptions { get; private set; }
        public DatabaseContext DatabaseContext { get => new DatabaseContext(ContextOptions); }
        public TestBase()
        {
            ContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(databaseName: "cnc")
            .EnableSensitiveDataLogging()
            .Options;

            // Insert seed data into the database using one instance of the context
            using (var context = new DatabaseContext(ContextOptions))
            {
                context.Campaigns.Add(new Campaign { CampaignId = "1", UserId = "1", Name = "campaign1", Description = "Descrition1" });
                context.Users.Add(new User { UserId = "1", Username = "username1", Name = "User1", Description = "User2", HashedPassword = "1234" });
                context.SaveChanges();
            }
        }


        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~TestBase()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion

    }
}