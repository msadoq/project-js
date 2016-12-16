const { pop } = require('common/callbacks');
const logger = require('common/log')('controllers:onPull');
const { reset } = require('../../websocket/dataQueue');

/**
 * Triggered when HSC main process pull data spooled by HSC
 *
 * - empty and returns current spooled data
 *
 * @param queryId
 */
module.exports = (queryId) => {
  logger.verbose('called');

  const callback = pop(queryId);
  if (!callback) {
    return logger.warn(`unknown queryId ${queryId}`);
  }

  const payload = reset();
  return callback(payload);
};
