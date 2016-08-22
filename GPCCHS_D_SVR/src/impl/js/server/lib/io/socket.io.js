const debug = require('../io/debug')('socket.io');
const sio = require('socket.io');

let io = null;

const openWebsockets = (server, cb) => {
  io = sio(server);
  io.sockets.on('connection', (webSocket) => {
    webSocket.on('disconnect', () => {
      debug.info('websocket closed');
    });

    debug.info('websocket open');
    webSocket.emit('message', 'Cache WebSocket connected');
  });

  cb();
};

module.exports = { openWebsockets, getSocketIo: () => io };
