const logger = require('common/log')('controllers/utils');
const globalConstants = require('common/constants');
const { decode } = require('../../../utils/adapters');

const reply = require('../../../utils/ipc/reply');

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
  [globalConstants.MESSAGETYPE_DOMAIN_DATA]: (...args) => onDomainsData(reply, ...args),
  [globalConstants.MESSAGETYPE_RESPONSE]: onResponse,
  [globalConstants.MESSAGETYPE_SESSION_DATA]: (...args) => onSessionsData(reply, ...args),
  [globalConstants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA]: onTimebasedArchiveData,
  [globalConstants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA]: onTimebasedPubSubData,
  [globalConstants.MESSAGETYPE_FMD_CREATE_DATA]: (...args) => onFmdCreateData(reply, ...args),
  [globalConstants.MESSAGETYPE_FMD_GET_DATA]: (...args) => onFmdGetData(reply, ...args),
  [globalConstants.MESSAGETYPE_SESSION_MASTER_DATA]: (...args) =>
    onSessionMasterData(reply, ...args),
  [globalConstants.MESSAGETYPE_SESSION_TIME_DATA]: (...args) => onSessionTimeData(reply, ...args),
  [globalConstants.MESSAGETYPE_DC_STATUS]: onDcStatus,
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
