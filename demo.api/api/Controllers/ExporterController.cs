using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace demo.api.Controllers
{
    [Route("api/exports")]
    [ApiController]
    public class ExporterController : ControllerBase
    {
        [Authorize(Roles = "ExportLeads")]
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "Export" };
        }
    }
}
