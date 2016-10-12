const debug = require('../io/debug')('controllers:onWindowOpen');

/**
 * Triggered when HSC open a new window and send the 'authenticate' message
 *
 * - anwser window WebSocket with 'authenticated' event (for HSC lifecycle)
 *
 * @param spark
 * @param windowId
 */
module.exports = (spark, windowId) => {
  debug.info(`called (${windowId})`);

  return spark.write({
    event: 'authenticated',
  });
};
