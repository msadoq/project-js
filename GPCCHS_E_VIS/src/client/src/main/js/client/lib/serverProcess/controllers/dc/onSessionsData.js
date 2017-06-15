const { decode } = require('../../../utils/adapters');
const { registerProtobuf } = require('../../../common/test');

registerProtobuf();

const logger = require('../../../common/logManager')('controllers:onSessionData');

/**
 * Triggered on DC session request response.
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

  const { sessions } = decode('dc.dataControllerUtils.Sessions', buffer);
  reply(queryId, { sessions });
};
