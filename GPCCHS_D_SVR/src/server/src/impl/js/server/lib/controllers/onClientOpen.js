const debug = require('../io/debug')('controllers:onClientOpen');

/**
 * Triggered when client main process WebSocket opens
 *
 * - no specific action
 *
 * @param spark
 */
module.exports = (spark) => {
  debug.info(`called (${spark.id})`);
};
