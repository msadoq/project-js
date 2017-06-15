const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onFmdCreateData');
const globalConstants = require('../../../constants');

/**
 * Triggered on create FMD document response
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param statusBuffer
 * @param buffer
 */
module.exports = (reply, queryIdBuffer, statusBuffer, buffer) => {
  logger.silly('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);

  const { status } = decode('dc.dataControllerUtils.Status', statusBuffer);
  if (status !== globalConstants.STATUS_SUCCESS) {
    const { string: reason } = decode('dc.dataControllerUtils.String', buffer);
    reply(queryId, { err: reason });
  } else {
    reply(queryId, decode('dc.dataControllerUtils.FMDFileInfo', buffer));
  }
};
