const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers/utils');
const constants = require('../../../constants');

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
  [constants.MESSAGETYPE_FMD_CREATE_DATA]: args => onFmdCreateData(reply, args),
  [constants.MESSAGETYPE_FMD_GET_DATA]: args => onFmdGetData(reply, args),
  [constants.MESSAGETYPE_SESSION_MASTER_DATA]: onSessionMasterData,
  [constants.MESSAGETYPE_SESSION_TIME_DATA]: onSessionTimeData,
  [constants.MESSAGETYPE_DC_STATUS]: onDcStatus,
};

module.exports = function dcController() {
  /**
   * Workaround: under the hood ES6 transpilation to ES5 replace rest operator with a .apply() call
   * a known issue cause a 'Maximum call stack size exceeded' when function receives thousands of
   * arguments.
   *
   * source: https://stackoverflow.com/questions/42263108/why-does-apply-with-too-many-arguments-throw-maximum-call-stack-size-exceeded
   */
    // eslint-disable-next-line prefer-rest-params, "DV6 TBC_CNES LPISIS Avoid 'Maximum call stack size exceeded' with rest operators and .apply() usage"
  const args = arguments;
  // args[0] trash
  const headerBuffer = args[1];
  const buffers = Array.prototype.slice.call(args, 2);

  const { messageType } = decode('dc.dataControllerUtils.Header', headerBuffer);
  if (!messageType) {
    return logger.warn('invalid message received (no messageType)');
  }

  const fn = controllers[messageType];
  if (!fn) {
    return logger.warn(`invalid message received (unknown messageType) '${messageType}'`);
  }

  logger.silly(`running '${messageType}'`);
  return fn(buffers);
};
