using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using EntityFramework.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {

        private readonly cncContext _db;
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger, cncContext context)
        {
            _db = context;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            // var campaigns = _db.Campaigns.Include(campaign => campaign.User).ToList();
            var users = _db.Users
                .Include(user => user.Campaigns)
                .ToList();
            
            var dtos = new List<UserDto>();
            if(users.Any())
            {
                foreach(var user in users)
                {
                    var dto = new UserDto();
                    dto.UserId = user.UserId;
                    dto.Description = user.Description;
                    dto.Name = user.Description;
                    dto.Username = user.Username;
                    foreach(var campaign in user.Campaigns)
                    {
                        dto.CampaignIds.Add(campaign.CampaignId);
                    }
                    dtos.Add(dto);
                }
                return new JsonResult(dtos);
            }
            return new NotFoundResult();            
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var users = _db.Users
                .Where(user => user.UserId == id)
                .Include(user => user.Campaigns);;
                
            if(users.Any())
            {
                var user = users.First();
                var dto = new UserDto();
                dto.UserId = user.UserId;
                dto.Description = user.Description;
                dto.Name = user.Description;
                dto.Username = user.Username;
                foreach(var campaign in user.Campaigns)
                {
                    dto.CampaignIds.Add(campaign.CampaignId);
                }
                return new JsonResult(dto);
            }
            return new NotFoundResult();
        }
    }
}
