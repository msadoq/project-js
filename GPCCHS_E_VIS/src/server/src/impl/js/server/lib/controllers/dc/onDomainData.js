const logger = require('common/log')('controllers:onDomainData');
const { decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');

/**
 * Triggered on DC domain request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports.onDomainData = (queryIdBuffer, buffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    return logger.warn(`unknown queryId ${queryId}`);
  }

  return callback(decode('dc.dataControllerUtils.Domains', buffer).domains);
};
