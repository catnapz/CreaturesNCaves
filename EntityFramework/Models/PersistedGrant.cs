using System;
using System.Collections.Generic;

namespace EntityFramework.Models
{
    public partial class PersistedGrant
    {
        public string Key { get; set; }
        public string Type { get; set; }
        public string SubjectId { get; set; }
        public string ClientId { get; set; }
        public string CreationTime { get; set; }
        public string Expiration { get; set; }
        public string Data { get; set; }
    }
}
