const logger = require('common/log')('controllers:onSessionMasterData');
const { decode, getType } = require('common/protobuf');

/**
 * Triggered on DC master session request response.
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

  reply(queryId, {
    masterSessionId: decode(getType('UINTEGER'), buffer).value,
  });
};
