using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Models;
using thyrel_api.Websocket;
using thyrel_api.Controllers;
using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private IWebsocketHandler _websocketHandler;
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public TestController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

        // GET: api/Test
        [HttpGet]
        public async Task<ActionResult<Player>> Get()
<<<<<<< HEAD
        {
=======
        {
            var c = new ElementDataProvider();
            await c.SetSentence(1, "false mon petit didier");
>>>>>>> sprint-2
            return null;
        }
        
        // POST: api/Test
        [HttpPost]
        public IEnumerable<string> Post([FromBody] string value)
        {
            var isInt = int.TryParse(value, out var intValue);
            _websocketHandler.SendMessageToSockets("YOYO here", isInt ? intValue : null);
            return new[] { "Here is you're value", value};
        }
    }
}