const logger = require('../../../common/logManager')('controllers:onSessionMasterData');
const { decode, getType } = require('../../../utils/adapters');
/**
 * Triggered on DC master session request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (reply, queryIdBuffer, buffer) => {
  logger.silly('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);

  reply(queryId, {
    masterSessionId: decode(getType('UINTEGER'), buffer).value,
  });
};
