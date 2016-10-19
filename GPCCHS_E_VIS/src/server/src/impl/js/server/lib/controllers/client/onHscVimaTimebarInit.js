const debug = require('../../io/debug')('controllers:onHscVimaTimebarUpdate');
const zmq = require('../../io/zmq');
const _ = require('lodash');

/**
 * Triggered when HSC send the timebar status (one time on launch)
 * @param timebar
 */
module.exports = (spark, timebars) => {
  spark.write({ event: 'ready' });
  // Transform timebar json to be compliant with tb Qt
  let tbForQt = {};
  if (timebars.length > 0) {
    tbForQt = _.omit(timebars[0], 'timelines');
    tbForQt.timeLines = [];
    let index = 0;
    _.each(timebars[0].timelines, (timeline) => {
      tbForQt.timeLines.push({
        id: index,
        name: timeline.id,
        offset: timeline.offset,
        kind: timeline.kind,
        sessionId: timeline.sessionId,
      });
      if (timeline.id === timebars[0].masterId) {
        tbForQt.masterId = index;
      }
      index += 1;
    });
  }

  debug.info('timebars received from HSC', tbForQt);
  zmq.push('vimaTbPush', JSON.stringify(tbForQt), () => {
    debug.info('timebars sent to VIMA');
  });
};
