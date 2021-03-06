﻿namespace CreaturesNCaves.EntityFramework.Models
{
    public partial class Campaign
    {
        public int CampaignId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual User User { get; set; }
    }
}
