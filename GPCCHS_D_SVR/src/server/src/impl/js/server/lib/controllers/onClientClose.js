const debug = require('../io/debug')('controllers:onClientClose');

/**
 * Triggered when client main process WebSocket closes
 *
 * - unsubscribe every pub/sub connectedData
 * - cleanup local cacheJson (loki)
 * - cleanup local connectedData (loki)
 * - cleanup local domains
 * - cleanup local timebar
 *
 * @param spark
 */
module.exports = (spark) => {
  debug.info(`called (${spark.id})`);

  // TODO unsubscribe every pub/sub connectedData
  // TODO cleanup local cacheJson (loki)
  // TODO cleanup local connectedData (loki)
  // TODO cleanup local domains
  // TODO cleanup local timebar
};
