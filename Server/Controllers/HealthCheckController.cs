using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CreaturesNCaves.Server.Controllers
{
    [ApiController]
    [Route("health")]
    public class HealthCheckController : ControllerBase
    {

        private readonly ILogger<HealthCheckController> _logger;

        public HealthCheckController(ILogger<HealthCheckController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public OkResult Get()
        {
            _logger.LogInformation("[GET] /health");
            return Ok();
        }
    }
}
