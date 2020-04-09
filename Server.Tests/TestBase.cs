using System;
using CreaturesNCaves.EntityFramework.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;

namespace CreaturesNCaves.Server.Tests
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
        }


        #region IDisposable Support
        private bool _disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (_disposedValue) return;
            
            if (disposing)
            {
                using (var context = DatabaseContext)
                {
                    context.Campaigns.RemoveRange(DatabaseContext.Campaigns);
                    context.Users.RemoveRange(DatabaseContext.Users);
                    context.SaveChanges();
                }
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
