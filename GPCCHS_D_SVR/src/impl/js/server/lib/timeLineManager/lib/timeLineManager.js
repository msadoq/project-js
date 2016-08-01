
const { timeLinePullSocket } = require('../../io/zmq');
const { cacheWebSocket } = require('../../io/socket.io');
const debug = require('../../io/debug')('timeLineManager:timeLineManager');


const onMessage = (timelines) => {
  const timelinesJson = JSON.parse(timelines);
  debug.debug(`TimeLine Master Id: ${timelinesJson.MasterId}`);
  for (const timeline of timelinesJson.Timelines) {
    debug.debug(`TimeLine Name: ${timeline.TimelineName}`);
    debug.debug(`TimeLine dInf: ${timeline.VisuWindow.dInf}`);
    debug.debug(`TimeLine dSup: ${timeline.VisuWindow.dSup}`);

    const timeRangeConfiguration = {
      type: 'xExtents',
      begin: timeline.VisuWindow.dInf,
      end: timeline.VisuWindow.dSup,
    };
    const currentTimeConfiguration = {
      type: 'VLineMarkerConfiguration',
      color: 'green',
      coord: timeline.CurrentTime,
      unit: 'time',
    };

    cacheWebSocket().emit('timeline', timeRangeConfiguration);
    cacheWebSocket().emit('timeline', currentTimeConfiguration);
  }
};

const init = () => {
  debug.info('INIT TimeLine Manager Message Reception');
  timeLinePullSocket.on('message', onMessage);
};

module.exports = { init };
