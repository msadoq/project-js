const debug = require('../../io/debug')('controllers:onVimaTimeBarUpdate');
const { constants: globalConstants } = require('common');
const { sendToMain } = require('../../websocket/sendToMain');
const {
  each: _each,
  omit: _omit,
} = require('lodash');
/**
 * Controller that listens for timebar update
 * @param buffer
 */
module.exports = (buffer) => {
  debug.debug('called');
  // Buffer to JSON
  let updVimaTimebar;
  const string = buffer.toString();
  try {
    updVimaTimebar = JSON.parse(string);
  } catch (err) {
    throw err;
  }
  // Format json to be compliant with redux
  const tbForClient = _omit(updVimaTimebar, 'timeLines');
  tbForClient.timelines = [];
  _each(updVimaTimebar.timeLines, (timeline) => {
    tbForClient.timelines.push({
      id: timeline.name,
      offset: timeline.offset,
      kind: timeline.kind,
      sessionId: timeline.sessionId,
    });
    if (timeline.id === updVimaTimebar.masterId) {
      tbForClient.masterId = timeline.name;
    }
  });
  sendToMain(globalConstants.EVENT_TIMEBAR_UPDATE, tbForClient);
};
