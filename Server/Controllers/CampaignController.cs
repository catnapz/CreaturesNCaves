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
      List<Campaign> list = _db.Campaigns
          .ToList();
      var Campaigns = list;

      var dtos = new List<CampaignDto>();
      if (Campaigns.Any())
      {
        foreach (var campaign in Campaigns)
        {
          var dto = new CampaignDto();
          dto.CampaignId = campaign.CampaignId;
          dto.Description = campaign.Description;
          dto.Name = campaign.Description;
          dto.UserId = campaign.UserId;
          dtos.Add(dto);
        }
        return new JsonResult(dtos);
      }
      return new NotFoundResult();
    }
  }
}
