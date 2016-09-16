const debug = require('../io/debug')('controllers:onWindowOpen');

/**
 * Triggered when HSC open a window and send the 'authenticate' message
 * @param spark
 * @param windowId
 */
module.exports = (spark, windowId) => {
  debug.debug('window websocket opened', windowId);
  return spark.write({
    event: 'authenticated',
  });
};
