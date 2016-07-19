const timeLineWebsocket = require('socket.io')(server);
const cacheWebsocket = require('socket.io')(server);

timeLineWebsocket.sockets.on('connection', () => {
  console.log('TimeLine WebSocket connected');
});

cacheWebsocket.sockets.on('connection', () => {
  console.log('TimeLine WebSocket connected');
});
