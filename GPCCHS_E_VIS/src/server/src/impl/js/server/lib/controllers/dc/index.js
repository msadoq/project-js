/* eslint global-require:0 */
const logger = require('common/log')('controllers/dc');
const globalConstants = require('common/constants');
const { decode } = require('common/protobuf');

const controllers = {
  [globalConstants.MESSAGETYPE_RESPONSE]: require('./onResponse').onResponse,
  [globalConstants.MESSAGETYPE_DOMAIN_DATA]: require('./onDomainData').onDomainData,
  [globalConstants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA]: require('./onTimebasedArchiveData').onTimebasedArchiveData,
  [globalConstants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA]: require('./onTimebasedPubSubData').onTimebasedPubSubData,
  [globalConstants.MESSAGETYPE_SESSION_DATA]: require('./onSessionData').onSessionData,
  [globalConstants.MESSAGETYPE_FILEPATH_DATA]: require('./onFilepathData').onFilepathData,
};

module.exports = (trash, headerBuffer, ...args) => {
  const { messageType } = decode('dc.dataControllerUtils.Header', headerBuffer);
  if (!messageType) {
    return logger.warn('invalid message received (no messageType)');
  }

  const fn = controllers[messageType];
  if (!fn) {
    return logger.warn(`invalid message received (unknown messageType) '${messageType}'`);
  }

  logger.debug(`running '${messageType}'`);
  return fn(...args);
};
