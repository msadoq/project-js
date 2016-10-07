const debug = require('../io/debug')('controllers:onHscVimaTimebarUpdate');
const zmq = require('../io/zmq');

/**
 * Triggered when HSC send the timebar status (one time on launch)
 * @param timebar
 */
module.exports = (spark, timebars) => {
  spark.write({ event: 'ready' });
  debug.info('timebars received from HSC', timebars);
  zmq.push('vimaTbPush', JSON.stringify(timebars), () => {
    debug.info('timebars sent to VIMA');
  });
};
