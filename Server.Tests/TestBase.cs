using System;
using System.Threading;
using CreaturesNCaves.EntityFramework.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;

namespace CreaturesNCaves.Server.Tests
{
    public class TestBase : IDisposable
    {
        private IOptions<OperationalStoreOptions> OperationalStoreOptions { get; set; }
        private DbContextOptions<DatabaseContext> ContextOptions { get; set; }
        public DatabaseContext DatabaseContext => new DatabaseContext(ContextOptions, OperationalStoreOptions);
        
        public TestBase(string databaseName = null)
        {
            ContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(databaseName: databaseName ?? "cnc")
            .EnableSensitiveDataLogging()
            .EnableDetailedErrors()
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

            DatabaseContext.Database.EnsureCreated();
        }


        #region IDisposable Support
        private bool _disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (_disposedValue) return;
            
            if (disposing)
            {
                DatabaseContext.Database.EnsureDeleted();
                ContextOptions = null;
                OperationalStoreOptions = null;
            }

            _disposedValue = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion

    }
}
