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

        private readonly DatabaseContext _db;
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger, DatabaseContext context)
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
            
            if(users.Any())
            {
                return new JsonResult(users);
            }
            return new NotFoundResult();            
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var users = _db.Users
                .Where(user => user.Id == id)
                .Include(user => user.Campaigns);;
                
            if(users.Any())
            {
                return new JsonResult(users);
            }
            return new NotFoundResult();
        }
    }
}
