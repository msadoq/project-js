const sio = require('socket.io');
let io = null;

const bindWebSockets = (server, cb) => {
  io = sio(server);
  io.sockets.on('connection', (webSocket) => {
    console.log('Cache WebSocket connected');
    webSocket.emit('message', 'Cache WebSocket connected');
  });

  cb();
};

module.exports = { bindWebSockets, cacheWebsocket: () => io };
