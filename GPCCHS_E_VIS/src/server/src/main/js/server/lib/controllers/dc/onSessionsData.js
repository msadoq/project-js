const logger = require('common/log')('controllers:onSessionData');
const { decode } = require('common/protobuf');

/**
 * Triggered on DC session request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (reply, queryIdBuffer, buffer) => {
  logger.verbose('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.debug('decoded queryId', queryId);

  const { sessions } = decode('dc.dataControllerUtils.Sessions', buffer);
  reply(queryId, { sessions });
};
