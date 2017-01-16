const logger = require('common/log')('controllers:onSessionMasterData');
const { decode, getType } = require('common/protobuf');
const reply = require('common/ipc/reply');

/**
 * Triggered on DC master session request response.
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

  reply(queryId, {
    masterSessionOid: decode(getType('UINTEGER'), buffer),
  });
};

