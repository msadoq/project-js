const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onSessionData');
const { pop } = require('../../../common/callbacks');

/**
 * Triggered on DC session request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (queryIdBuffer, buffer) => {
  logger.silly('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);
  const callback = pop(queryId);

  const { sessions } = decode('dc.dataControllerUtils.Sessions', buffer);
  callback(sessions);
};
