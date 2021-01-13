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
        private DbContextOptions<DatabaseContext> ContextOptions { get; set; }
        public DatabaseContext DatabaseContext => new DatabaseContext(ContextOptions);
        
        public TestBase(string databaseName = null)
        {
            ContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(databaseName: databaseName ?? "cnc")
            .EnableSensitiveDataLogging()
            .EnableDetailedErrors()
            .Options;
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
