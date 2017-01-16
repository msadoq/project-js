const logger = require('common/log')('controllers/dc');
const globalConstants = require('common/constants');
const { decode } = require('common/protobuf');

const onResponse = require('./onResponse');
const onDomainsData = require('./onDomainsData');
const onTimebasedArchiveData = require('./onTimebasedArchiveData');
const onTimebasedPubSubData = require('./onTimebasedPubSubData');
const onSessionsData = require('./onSessionsData');
const onFmdCreateData = require('./onFmdCreateData');
const onFmdGetData = require('./onFmdGetData');
const onSessionMasterData = require('./onSessionMasterData');
const onSessionTimeData = require('./onSessionTimeData');

const controllers = {
  [globalConstants.MESSAGETYPE_DOMAIN_DATA]: onDomainsData,
  [globalConstants.MESSAGETYPE_RESPONSE]: onResponse,
  [globalConstants.MESSAGETYPE_SESSION_DATA]: onSessionsData,
  [globalConstants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA]: onTimebasedArchiveData,
  [globalConstants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA]: onTimebasedPubSubData,
  [globalConstants.MESSAGETYPE_FMD_CREATE_DATA]: onFmdCreateData,
  [globalConstants.MESSAGETYPE_FMD_GET_DATA]: onFmdGetData,
  [globalConstants.MESSAGETYPE_SESSION_MASTER_DATA]: onSessionMasterData,
  [globalConstants.MESSAGETYPE_SESSION_TIME_DATA]: onSessionTimeData,
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
