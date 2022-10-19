using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Exceptions;
// using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("exceptions/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ExceptionController : BaseApiController
    {
        public IActionResult Exception(int code)
        {
            return new ObjectResult(new Response(code));
        }
    }
}