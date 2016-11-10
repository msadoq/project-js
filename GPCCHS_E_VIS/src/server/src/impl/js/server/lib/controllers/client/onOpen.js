const debug = require('../../io/debug')('controllers:onOpen');

/**
 * Triggered when HSC main process WebSocket opens
 *
 * @param spark
 */
module.exports = (spark) => {
  debug.info(`called (${spark.id})`);
};
