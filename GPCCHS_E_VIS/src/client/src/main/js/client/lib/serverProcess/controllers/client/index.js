const zmq = require('common/zmq');
const constants = require('../../../constants');

const handle = require('../../../common/ipc/handle');
const reply = require('../../../common/ipc/reply');

const onReduxCurrentState = require('./onReduxCurrentState');
const onReduxDispatch = require('./onReduxDispatch');
const onDomainsQuery = require('./onDomainsQuery');
const onPull = require('./onPull');
const onHealth = require('./onHealth');
const onCacheCleanup = require('./onCacheCleanup');
const onTimebasedQuery = require('./onTimebasedQuery');
const onSessionsQuery = require('./onSessionsQuery');
const onServerDebug = require('./onServerDebug');
const onFmdGet = require('./onFmdGet');
const onFmdCreate = require('./onFmdCreate');
const onGetMasterSession = require('./onGetMasterSession');
const onGetSessionTime = require('./onGetSessionTime');
const onProductLog = require('./onProductLog');

const pushToDc = args => zmq.push('dcPush', args);

const controller = {
  [constants.IPC_METHOD_REDUX_CURRENT_STATE]: (...args) => onReduxCurrentState(reply, ...args),
  [constants.IPC_METHOD_REDUX_DISPATCH]: onReduxDispatch,
  [constants.IPC_METHOD_DOMAINS_REQUEST]: (...args) => onDomainsQuery(pushToDc, ...args),
  [constants.IPC_METHOD_SESSIONS_REQUEST]: (...args) => onSessionsQuery(pushToDc, ...args),
  [constants.IPC_METHOD_CACHE_CLEANUP]: (...args) => onCacheCleanup(pushToDc, ...args),
  [constants.IPC_METHOD_TIMEBASED_PULL]: (...args) => onPull(reply, ...args),
  [constants.IPC_METHOD_HEALTH_PULL]: (...args) => onHealth(reply, ...args),
  [constants.IPC_METHOD_TIMEBASED_QUERY]: (...args) => onTimebasedQuery(pushToDc, ...args),
  [constants.IPC_METHOD_SERVER_DEBUG]: (...args) => onServerDebug(reply, ...args),
  [constants.IPC_METHOD_FMD_GET]: (...args) => onFmdGet(pushToDc, ...args),
  [constants.IPC_METHOD_FMD_CREATE]: (...args) => onFmdCreate(pushToDc, ...args),
  [constants.IPC_METHOD_MASTER_SESSION]: (...args) => onGetMasterSession(pushToDc, ...args),
  [constants.IPC_METHOD_SESSION_TIME]: (...args) => onGetSessionTime(pushToDc, ...args),
  [constants.IPC_METHOD_PRODUCT_LOG]: (...args) => onProductLog(pushToDc, ...args),
};

module.exports = data => handle(
  controller,
  data,
  payload => process.send(payload)
);
