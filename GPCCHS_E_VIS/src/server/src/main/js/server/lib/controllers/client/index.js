const handle = require('common/ipc/handle');
const reply = require('common/ipc/reply');
const zmq = require('common/zmq');
const globalConstants = require('common/constants');

const onDomainsQuery = require('./onDomainsQuery');
const onPull = require('./onPull');
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
  [globalConstants.IPC_METHOD_DOMAINS_REQUEST]: (...args) => onDomainsQuery(pushToDc, ...args),
  [globalConstants.IPC_METHOD_SESSIONS_REQUEST]: (...args) => onSessionsQuery(pushToDc, ...args),
  [globalConstants.IPC_METHOD_CACHE_CLEANUP]: (...args) => onCacheCleanup(pushToDc, ...args),
  [globalConstants.IPC_METHOD_TIMEBASED_PULL]: (...args) => onPull(reply, ...args),
  [globalConstants.IPC_METHOD_TIMEBASED_QUERY]: (...args) => onTimebasedQuery(pushToDc, ...args),
  [globalConstants.IPC_METHOD_SERVER_DEBUG]: (...args) => onServerDebug(reply, ...args),
  [globalConstants.IPC_METHOD_FMD_GET]: (...args) => onFmdGet(pushToDc, ...args),
  [globalConstants.IPC_METHOD_FMD_CREATE]: (...args) => onFmdCreate(pushToDc, ...args),
  [globalConstants.IPC_METHOD_MASTER_SESSION]: (...args) => onGetMasterSession(pushToDc, ...args),
  [globalConstants.IPC_METHOD_SESSION_TIME]: (...args) => onGetSessionTime(pushToDc, ...args),
  [globalConstants.IPC_METHOD_PRODUCT_LOG]: (...args) => onProductLog(pushToDc, ...args),
};

module.exports = data => handle(
  controller,
  data,
  payload => process.send(payload)
);
