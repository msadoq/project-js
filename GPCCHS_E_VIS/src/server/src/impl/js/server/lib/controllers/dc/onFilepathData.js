const logger = require('common/log')('controllers:onFilepathData');
const { decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');

/**
 * Triggered on DC filepath from oId request response
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports.onFilepathData = (queryIdBuffer, buffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    return callback({ err: `unknown queryId ${queryId}` });
  }

  return callback({ path: decode('dc.dataControllerUtils.String', buffer).string });
};
