const debug = require('../io/debug')('controllers:onWindowClose');

/**
 * Triggered when HSC close a window
 * @param spark
 * @param windowId
 */
module.exports = (spark, windowId) => {
  debug.debug('window websocket closed', windowId);

  // TODO destroy all window views
};
