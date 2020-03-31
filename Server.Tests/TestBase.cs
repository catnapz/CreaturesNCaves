using System;
using EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using IdentityServer4.EntityFramework.Options;
using Moq;
using System.Collections.Generic;

namespace Server.Tests
{
    public class TestBase : IDisposable
    { 
        public IOptions<OperationalStoreOptions> OperationalStoreOptions { get; private set; }
        public DbContextOptions<DatabaseContext> ContextOptions { get; private set; }
        public DatabaseContext DatabaseContext { get => new DatabaseContext(ContextOptions, OperationalStoreOptions); }
        public TestBase()
        {
            ContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(databaseName: "cnc")
            .EnableSensitiveDataLogging()
            .Options;

            OperationalStoreOptions = Mock.Of<IOptions<OperationalStoreOptions>>();
            Mock.Get(OperationalStoreOptions).Setup(x => x.Value).Returns(new OperationalStoreOptions
            {
                DeviceFlowCodes =
                {
                    Name = "DeviceCodes"
                },
                PersistedGrants =
                {
                    Name = "PersistedGrants"
                },
                TokenCleanupBatchSize = 100,
                TokenCleanupInterval = 3600
            });

            // Insert seed data into the database using one instance of the context
            using (var context = new DatabaseContext(ContextOptions, OperationalStoreOptions))
            {
                context.Users.Add(new User { Id = "U1", Description = "UD1", Name = "UN1" });
                context.Users.Add(new User { Id = "U2", Description = "UD2", Name = "UN2" });
                
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
