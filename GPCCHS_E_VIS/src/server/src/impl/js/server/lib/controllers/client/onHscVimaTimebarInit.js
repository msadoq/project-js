const debug = require('../../io/debug')('controllers:onHscVimaTimebarUpdate');
const { constants: globalConstants } = require('common');
const zmq = require('../../io/zmq');
const {
  each: _each,
  omit: _omit,
} = require('lodash');

/**
 * Triggered when HSC send the timebar status (one time on launch)
 * @param timebar
 */
module.exports = (spark, timebars) => {
  spark.write({ event: globalConstants.EVENT_READY });
  // Transform timebar json to be compliant with tb Qt
  let tbForQt = {};
  if (timebars.length > 0) {
    tbForQt = _omit(timebars[0], 'timelines');
    tbForQt.mode = 'Normal';
    tbForQt.timeSpec = 'UTC';
    tbForQt.timeLines = [];
    let index = 0;
    _each(timebars[0].timelines, (timeline) => {
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

  debug.info('timebars received from HSC');
  debug.verbose(tbForQt);
  zmq.push('vimaTbPush', JSON.stringify(tbForQt), () => {
    debug.info('timebars sent to VIMA');
  });
};
