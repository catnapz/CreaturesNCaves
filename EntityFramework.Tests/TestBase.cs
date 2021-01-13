using System;
using CreaturesNCaves.EntityFramework.Models;
using Npgsql.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace EntityFramework.Tests
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
                context.Campaigns.Add(new Campaign { CampaignId = 1, Description = "CD1", Name = "CN1", User = null, UserId = "U1" });
                context.Campaigns.Add(new Campaign { CampaignId = 2, Description = "CD2", Name = "CN2", User = null, UserId = "U2" });
                context.SaveChanges();
            }
        }


        #region IDisposable Support
        private bool _disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                _disposedValue = true;
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
