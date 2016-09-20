const debug = require('../io/debug')('controllers:onWindowClose');

/**
 * Triggered when HSC close a window
 *
 * - unsubscribe every pub/sub connectedData (listened only for this window)
 * - cleanup local cacheJson (loki) (connectedData listened only for this window)
 * - cleanup local connectedData (loki) (connectedData listened only for this window)
 *
 * @param spark
 * @param windowId
 */
module.exports = (spark, windowId) => {
  debug.info(`called (${windowId})`);

  // TODO unsubscribe every pub/sub connectedData (listened only for this window)
  // TODO cleanup local cacheJson (loki) (connectedData listened only for this window)
  // TODO cleanup local connectedData (loki) (connectedData listened only for this window)
};
