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
  [Route("campaign")]
  public class CampaignController : ControllerBase
  {

    private readonly DatabaseContext _db;
    private readonly ILogger<CampaignController> _logger;

    public CampaignController(ILogger<CampaignController> logger, DatabaseContext context)
    {
      _db = context;
      _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
      var campaigns = _db.Campaigns
          .ToList();

      if (campaigns.Any())
      {
        return new JsonResult(campaigns);
      }
      return new NotFoundResult();
    }
  }
}
