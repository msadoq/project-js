// eslint-disable-next-line import/no-extraneous-dependencies
const logger = require('common/log')('controllers:onOpen');

/**
 * Triggered when HSC main process WebSocket opens
 *
 * @param spark
 */
module.exports = (spark) => {
  logger.verbose(`called (${spark.id})`);
};
