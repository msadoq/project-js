const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onSessionTimeData');
const { pop } = require('../../../common/callbacks');

/**
 * Triggered on DC session time request response.
 *
 * - decode and pass to registered callback
 *
 * @param args array
 */
module.exports = (args) => {
  logger.silly('called');

  const queryIdBuffer = args[0];
  const buffer = args[1];

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);
  const callback = pop(queryId);

  callback({ timestamp: decode('dc.dataControllerUtils.Timestamp', buffer).ms });
};
