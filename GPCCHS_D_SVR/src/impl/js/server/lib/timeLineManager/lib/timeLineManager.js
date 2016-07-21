
const { timeLinePullSocket } = require('../../io/zmq');
const tlMgrApi = require('./timeLineManagerApi.js');
const { cacheWebSocket } = require('../../io/socket.io');


const onMessage = (timelines) => {
  const timelinesJson = JSON.parse(timelines);
  // console.log(`Master Id: ${timelinesJson.MasterId}`)
  for (const timeline of timelinesJson.Timelines) {
    // console.log(`TimelineName: ${timeline.TimelineName}`);
    // console.log(`dInf: ${timeline.VisuWindow.dInf}`);
    // console.log(`dSup: ${timeline.VisuWindow.dSup}`); 

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

    /*for (let i = 0; i < 2; i++) {
      wsSocket.emit(`plot${(i + 1)}`, JSON.stringify(timeRangeConfiguration));
      wsSocket.emit(`plot${(i + 1)}`, JSON.stringify(currentTimeConfiguration));
      
    }*/
    cacheWebSocket().emit('timeline', JSON.stringify(timeRangeConfiguration));
    cacheWebSocket().emit('timeline', JSON.stringify(currentTimeConfiguration));
  }
};

const init = () => { console.log('INIT TLMGR'); timeLinePullSocket.on('message', onMessage); };

module.exports = { init };