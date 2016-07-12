const zmq = require('zmq');
const socketIn = zmq.socket('pull');
const tlMgrApi = require('./timeLineManagerApi.js');
let wsSocket = null;

exports.setWebSocket = (io) => {
  wsSocket = io;
  wsSocket.sockets.on('connection', () => {
    console.log('Un client est connecté !');
  });

  wsSocket.sockets.on('connection', (viewSocket) => {
    viewSocket.emit('message', 'Vous êtes bien connecté à la websocket !');
    viewSocket.emit('open', 'Vous êtes bien Batman !');
  });
};

socketIn.on('message', (timelines) => {
  const timelinesJson = JSON.parse(timelines);
  // console.log(`Master Id: ${timelinesJson.MasterId};)
  for (const timeline of timelinesJson.Timelines) {
    /* console.log(`TimelineName: ${timeline.TimelineName}`);
    console.log(`dInf: ${timeline.VisuWindow.dInf}`);
    console.log(`dSup: ${timeline.VisuWindow.dSup}`); */

    const timeRangeConfiguration = {
      type: 'xExtents',
      id: 'batman',
      begin: timeline.VisuWindow.dInf,
      end: timeline.VisuWindow.dSup,
    };
    const currentTimeConfiguration = {
      type: 'VLineMarkerConfiguration',
      id: 'batman',
      color: 'green',
      coord: timeline.CurrentTime,
      unit: 'time',
    };

    for (let i = 0; i < 2; i++) {
      wsSocket.emit(`plot${(i + 1)}`, JSON.stringify(timeRangeConfiguration));
      wsSocket.emit(`plot${(i + 1)}`, JSON.stringify(currentTimeConfiguration));
    }
  }
});

socketIn.connect('tcp://127.0.0.1:4242');

