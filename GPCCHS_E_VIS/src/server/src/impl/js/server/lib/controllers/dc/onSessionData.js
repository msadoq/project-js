const logger = require('common/log')('controllers:onSessionData');
const { decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');

/**
 * Triggered on DC session request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports.onSessionData = (queryIdBuffer, buffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  const callback = registeredCallbacks.get(queryId);
  if (!callback) {
    return logger.warn(`unknown queryId ${queryId}`); // TODO SEND TO CLIENT!
  }

  return callback({ sessions: decode('dc.dataControllerUtils.Sessions', buffer).sessions });
};

