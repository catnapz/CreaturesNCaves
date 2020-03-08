using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CreaturesNCaves.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

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
        public JsonResult Get()
        {
            var campaigns = _db.Campaigns.Include(campaign => campaign.User);
            foreach (var campaign in _db.Campaigns)
            {
                var user = campaign.UserId;
                _logger.LogDebug(user);
            }
            JsonResult result = new JsonResult(_db.Campaigns);
            return result;
        }
    }
}
