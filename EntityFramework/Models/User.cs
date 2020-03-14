using System;
using System.Collections.Generic;
using HotChocolate;

namespace EntityFramework.Models
{

    public class UserDto
    {
        private List<string> _campaignIds;

        public string UserId { get; set; }
        public string Username { get; set; }
        public List<string> CampaignIds 
        { 
            get
            {
                return _campaignIds ?? (_campaignIds = new List<string>());
            } 
            set
            {
                _campaignIds = value;
            } 
        }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public partial class User
    {
        public User()
        {
            Campaigns = new HashSet<Campaign>();
        }

        public string UserId { get; set; }
        public string Username { get; set; }
        
        // [GraphQLIgnore]
        public string HashedPassword { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Campaign> Campaigns { get; set; }
    }
}
