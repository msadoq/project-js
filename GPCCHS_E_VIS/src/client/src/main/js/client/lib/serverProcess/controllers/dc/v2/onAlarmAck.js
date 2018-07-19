const logger = require('../../../../common/logManager')('controllers:onSessionDataADE');
const { pop } = require('../../../../common/callbacks');

/**
 * Triggered on alarmAck response.
 *
 * @param args array
 */
module.exports = (buffers, requestId) => {
  logger.silly('called');
  // const adeAlarmAckProto = buffers[0]; // C'est du ADEAlarmAck

  const callback = pop(requestId);
  callback();
};
