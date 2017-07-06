const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onFmdCreateData');
const globalConstants = require('../../../constants');

/**
 * Triggered on create FMD document response
 *
 * - decode and pass to registered callback
 *
 * @param reply function
 * @param args array
 */
module.exports = (reply, args) => {
  logger.silly('called');

  const queryIdBuffer = args[0];
  const statusBuffer = args[1];
  const buffer = args[2];

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
