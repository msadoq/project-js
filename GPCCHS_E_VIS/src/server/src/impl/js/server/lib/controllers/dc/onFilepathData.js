const logger = require('common/log')('controllers:onFilepathData');
const { decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');

/**
 * Triggered on DC filepath from oId request response
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param filepathBuffer
 */
module.exports.onFilepathData = (queryIdBuffer, filepathBuffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    return logger.warn(`unknown queryId ${queryId}`);
  }

  return callback(decode('dc.dataControllerUtils.String', filepathBuffer).string);
};
