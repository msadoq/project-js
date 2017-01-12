const logger = require('common/log')('controllers/dc');
const globalConstants = require('common/constants');
const { decode } = require('common/protobuf');

const { onResponse } = require('./onResponse');
const { onDomainData } = require('./onDomainData');
const { onTimebasedArchiveData } = require('./onTimebasedArchiveData');
const { onTimebasedPubSubData } = require('./onTimebasedPubSubData');
const { onSessionData } = require('./onSessionData');
const { onFilepathData } = require('./onFilepathData');

const controllers = {
  [globalConstants.MESSAGETYPE_RESPONSE]: onResponse,
  [globalConstants.MESSAGETYPE_DOMAIN_DATA]: onDomainData,
  [globalConstants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA]: onTimebasedArchiveData,
  [globalConstants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA]: onTimebasedPubSubData,
  [globalConstants.MESSAGETYPE_SESSION_DATA]: onSessionData,
  [globalConstants.MESSAGETYPE_FILEPATH_DATA]: onFilepathData,
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
