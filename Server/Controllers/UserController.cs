using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CreaturesNCaves.EntityFramework.Models;

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
            string name = "";
            foreach (var user in _db.Users)
            {
                name = user.Name;
                _logger.LogError(name);
            }
            JsonResult result = new JsonResult(name);
            return result;
        }
    }
}
