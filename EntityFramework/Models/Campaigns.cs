using System;
using System.Collections.Generic;

namespace CreaturesNCaves.EntityFramework.Models
{
    public partial class Campaigns
    {
        public string CampaignId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual Users User { get; set; }
    }
}
