const logger = require('../../../common/logManager')('controllers:onSessionTimeData');
const { pop } = require('../../../common/callbacks');
const { decode } = require('common/protobuf');

/**
 * Triggered on DC session time request response.
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

  callback({ timestamp: decode('dc.dataControllerUtils.Timestamp', buffer).ms });
};

// module.exports = (queryIdBuffer, buffer) => {
//   logger.silly('called');
//
//   const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
//   logger.silly('decoded queryId', queryId);
//   const callback = pop(queryId);
//
//   const { sessions } = decode('dc.dataControllerUtils.Sessions', buffer);
//   callback(sessions);
// };
