const debug = require('../io/debug')('controllers:onVimaTimeBarUpdate');
const { sendToMain } = require('../websocket/sendToMain');
const _ = require('lodash');
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
  const tbForClient = _.omit(updVimaTimebar, 'timeLines');
  tbForClient.timelines = [];
  _.each(updVimaTimebar.timeLines, (timeline) => {
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
  sendToMain('timebarUpdate', tbForClient);
};
