using System;
using System.Collections.Generic;

namespace EntityFramework.Models
{
    public partial class Campaign
    {
        public string CampaignId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual User User { get; set; }
    }
}
