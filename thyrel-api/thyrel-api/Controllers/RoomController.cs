using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Handler;
using thyrel_api.Json;
using thyrel_api.Models;
using thyrel_api.Models.DTO;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly HolyDrawDbContext _context;
        private readonly IWebsocketHandler _websocketHandler;

        public RoomController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }

        // Call this endpoint to create a room
        // POST: api/room
        [HttpPost]
        public async Task<ActionResult<Player>> Post([FromBody] PlayerRoomBody body)
        {
            if (body.Username == null || body.AvatarUrl == null)
                return NotFound();
            var roomDataProvider = new RoomDataProvider(_context);
            var playerDataProvider = new PlayerDataProvider(_context);

            var room = await roomDataProvider.Add();
            var token = await new TokenDataProvider(_context).Add();
            var player = await playerDataProvider.Add(body.Username, body.AvatarUrl, true, room.Id, token.Id);
            // use `GetPlayer` to include `Token` and `Room`
            return await playerDataProvider.GetPlayer(player.Id);
        }

        // To edit room settings
        // PATCH : api/room/13
        [HttpPatch("{roomId}")]
        public async Task<ActionResult> Patch(int roomId, [FromBody] RoomSettingsDto roomSettings)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player == null || !player.IsInRoom(roomId)) return Unauthorized();

            var room = await new RoomDataProvider(_context).Edit(roomId, roomSettings);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new RoomUpdateWebsocketEventJson(room)), roomId);

            return Ok(room);
        }

        // Call this endpoint to join a room
        // PATCH: api/room/join/roomidentifier
        [HttpPatch("join/{identifier}")]
        public async Task<ActionResult<Player>> Join(string identifier, [FromBody] PlayerRoomBody body)
        {
            if (body.Username == null || body.AvatarUrl == null)
                return NotFound(); // 404 : most of api error
            var room = await new RoomDataProvider(_context).GetRoom(identifier);
            if (room == null)
                return NotFound();
            var playerDataProvider = new PlayerDataProvider(_context);
            var token = await new TokenDataProvider(_context).Add();
            var player = await playerDataProvider.Add(body.Username, body.AvatarUrl, false, room.Id, token.Id);
            return await playerDataProvider.GetPlayer(player.Id);
        }

        // Call this endpoint to get a room
        // GET : api/room/4
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDto>> Get(int id)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player == null || !player.IsInRoom(id)) return Unauthorized();

            var room = await new RoomDataProvider(_context).GetRoom(id);
            return room;
        }

        // Call this endpoint to get players of a room
        // GET : api/room/{roomId}/players
        [HttpGet("{roomId}/players")]
        public async Task<ActionResult<List<PlayerDto>>> GetPlayersByRoom(int roomId)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player == null || !player.IsInRoom(roomId)) return Unauthorized();

            var players = await new PlayerDataProvider(_context).GetPlayersByRoom(roomId);
            return players;
        }

        // Call this endpoint to close the session and restart another one
        // PATCH : api/room/restart
        [HttpPatch("restart")]
        public async Task<ActionResult> Restart()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player == null || !player.IsOwner) return Unauthorized();

            var playerDataProvider = new PlayerDataProvider(_context);

            if (player.RoomId != null) await playerDataProvider.SetIsPlaying((int) player.RoomId, false);

            await new RoomDataProvider(_context).FinishSessionsByRoomId(player.RoomId);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new BaseWebsocketEventJson(WebsocketEvent.Restart)), player.RoomId);

            return Ok();
        }

        // Call this endpoint to close the session and restart another one
        // PATCH : api/room/reload_identifier
        [HttpPatch("reload_identifier")]
        public async Task<ActionResult<Room>> ReloadIdentifier()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null || !player.IsOwner) return Unauthorized();

            var room = await new RoomDataProvider(_context).GenerateNewIdentifier((int) player.RoomId);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new RoomReloadIdentifierEventJson(room)), player.RoomId);

            return NoContent();
        }

        public class PlayerRoomBody
        {
            public string AvatarUrl;
            public string Username;
        }
    }
}