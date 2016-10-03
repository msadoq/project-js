const debug = require('../io/debug')('controllers:onHscVimaTimebarUpdate');
const zmq = require('../io/zmq');
const _ = require('lodash');

/**
 * Triggered when HSC send the timebar status (one time on launch)
 * @param timebar
 */
module.exports = (spark, timebars) => {
  spark.write({
    event: 'ready',
  });
  debug.info('timebars', _.sample(timebars).timelines);
  // Send initial tb;
  zmq.push('vimaTbPush', JSON.stringify(timebars), () => {
    debug.info('tb init sent to VIMA TB widget');
  });
};
