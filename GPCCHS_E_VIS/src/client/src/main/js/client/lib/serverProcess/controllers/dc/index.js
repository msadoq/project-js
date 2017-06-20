const logger = require('../../../common/logManager')('controllers/utils');
const constants = require('../../../constants');
const { decode } = require('common/protobuf');

const reply = require('../../../common/ipc/reply');

const onResponse = require('./onResponse');
const onDomainsData = require('./onDomainsData');
const onTimebasedArchiveData = require('./onTimebasedArchiveData');
const onTimebasedPubSubData = require('./onTimebasedPubSubData');
const onSessionsData = require('./onSessionsData');
const onFmdCreateData = require('./onFmdCreateData');
const onFmdGetData = require('./onFmdGetData');
const onSessionMasterData = require('./onSessionMasterData');
const onSessionTimeData = require('./onSessionTimeData');
const onDcStatus = require('./onDcStatus');

const controllers = {
  [constants.MESSAGETYPE_DOMAIN_DATA]: onDomainsData,
  [constants.MESSAGETYPE_RESPONSE]: onResponse,
  [constants.MESSAGETYPE_SESSION_DATA]: onSessionsData,
  [constants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA]: onTimebasedArchiveData,
  [constants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA]: onTimebasedPubSubData,
  [constants.MESSAGETYPE_FMD_CREATE_DATA]: (...args) => onFmdCreateData(reply, ...args),
  [constants.MESSAGETYPE_FMD_GET_DATA]: (...args) => onFmdGetData(reply, ...args),
  [constants.MESSAGETYPE_SESSION_MASTER_DATA]: onSessionMasterData,
  [constants.MESSAGETYPE_SESSION_TIME_DATA]: (...args) => onSessionTimeData(reply, ...args),
  [constants.MESSAGETYPE_DC_STATUS]: onDcStatus,
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

  logger.silly(`running '${messageType}'`);
  return fn(...args);
};
