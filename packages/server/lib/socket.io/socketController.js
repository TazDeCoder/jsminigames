const consola = require('consola');
const { Server } = require('socket.io');

const RoomManager = require('./roomManager');
const { ALLOWLIST_HOSTS } = require('../../data/configValues');
const { ROOM_ID_RGX, LOBBY_REFRESH_MS } = require('../../data/constants');

module.exports = (server) => {
  const io = new Server(server, {
    path: '/socket',
    cors: {
      origin: ALLOWLIST_HOSTS,
    },
  });

  const classicMode = io.of('/classic');
  classicMode.on('connection', async (socket) => {
    const { username, roomId, password, action, config } =
      socket.handshake.query;

    consola.info(`Client ${socket.id} connected to classic game`);

    socket.on('disconnect', () => {
      consola.info(`Client ${socket.id} exited classic game`);
    });

    if (!ROOM_ID_RGX.test(roomId)) {
      // Force client to disconnect if id of room provided is not valid
      socket.disconnect();
    }

    const room = new RoomManager({
      io: classicMode,
      socket,
      username,
      roomId,
      password,
      action,
      config,
    });
    const joinedRoom = await room.init();

    if (joinedRoom) {
      room.emitShowClients();
      room.onIsReady();
      room.onSendMessage();
      room.onSubmit();
    }

    room.onDisconnect();
  });
  // Lobbies: Emits available rooms on the server
  const lobbies = io.of('/lobbies');
  const classicModeRooms = classicMode.adapter.rooms;
  let refreshInterval = null;
  lobbies.on('connection', (socket) => {
    consola.info(`Client ${socket.id} connected to lobbies`);

    socket.on('disconnect', () => {
      consola.info(`Client ${socket.id} exited lobbies`);
    });

    const intervalCallback = () => {
      const publicRooms = [];
      const allRooms = Array.from(classicModeRooms);

      for (let i = 0; i < allRooms.length; i += 1) {
        const [socketId] = allRooms[i];
        const room = classicModeRooms.get(socketId);
        const hasPropertyClients = Object.prototype.hasOwnProperty.call(
          room,
          'clients',
        );

        if (hasPropertyClients && !room.isPrivate) {
          const publicRoom = {
            roomId: room.roomId,
            numPlayers: room.clients.length,
            rounds: room.config.maxNumRounds,
            status: room.status,
          };
          publicRooms.push(publicRoom);
        }
      }

      lobbies.emit('lobby:show-public', publicRooms);
    };
    // Refreshes state of all public rooms
    refreshInterval = setInterval(() => {
      intervalCallback();
    }, LOBBY_REFRESH_MS);
  });
  lobbies.on('disconnect', () => {
    clearInterval(refreshInterval);
  });

  return io;
};
