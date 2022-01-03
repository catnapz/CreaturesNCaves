using System;
using System.Collections.Generic;
using System.Linq;
using CreaturesNCaves.EntityFramework.Models;
using Xunit;

namespace EntityFramework.Tests
{
    public class CampaignTests : IClassFixture<TestBase>
    {
        readonly TestBase _base;
        public CampaignTests(TestBase testBase)
        {
            _base = testBase;
        }

        [Fact]
        public void Campaigns()
        {
            using var context = _base.DatabaseContext;
            // Arrange
            var campaigns = context.Campaigns.Count<Campaign>();

            // Act

            // Assert
            Assert.Equal(2, campaigns);
        }
    }
}
