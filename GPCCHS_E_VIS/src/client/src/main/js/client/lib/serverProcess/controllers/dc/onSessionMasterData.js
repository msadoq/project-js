const logger = require('../../../common/logManager')('controllers:onSessionMasterData');
const { pop } = require('../../../common/callbacks');
const { decode, getType } = require('common/protobuf');

/**
 * Triggered on DC master session request response.
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

  const masterSessionId = decode(getType('UINTEGER'), buffer).value;
  callback(masterSessionId);
};
