const logger = require('common/log')('controllers:onSessionTimeData');
const { decode } = require('common/protobuf');
const reply = require('common/ipc/reply');

/**
 * Triggered on DC session time request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (queryIdBuffer, buffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  reply(queryId, { timestamp: decode('dc.dataControllerUtils.Timestamp', buffer) });
};

