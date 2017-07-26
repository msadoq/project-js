const zmq = require('common/zmq');
const constants = require('../../../constants');

const handle = require('../../../common/ipc/handle');
const reply = require('../../../common/ipc/reply');

const onReduxCurrentState = require('./onReduxCurrentState');
const onReduxDispatch = require('./onReduxDispatch');
const onDomainsQuery = require('./onDomainsQuery');
const onPull = require('./onPull');
const onCacheCleanup = require('./onCacheCleanup');
const onSessionsQuery = require('./onSessionsQuery');
const onProductLog = require('./onProductLog');

const pushToDc = args => zmq.push('dcPush', args);

const controller = {
  [constants.IPC_METHOD_REDUX_CURRENT_STATE]: (...args) => onReduxCurrentState(reply, ...args),
  [constants.IPC_METHOD_REDUX_DISPATCH]: onReduxDispatch,
  [constants.IPC_METHOD_DOMAINS_REQUEST]: (...args) => onDomainsQuery(pushToDc, ...args), // TODEL
  [constants.IPC_METHOD_SESSIONS_REQUEST]: (...args) => onSessionsQuery(pushToDc, ...args), // TODEL
  [constants.IPC_METHOD_CACHE_CLEANUP]: (...args) => onCacheCleanup(pushToDc, ...args),
  [constants.IPC_METHOD_TIMEBASED_PULL]: (...args) => onPull(reply, ...args),
  [constants.IPC_METHOD_PRODUCT_LOG]: (...args) => onProductLog(pushToDc, ...args), // TODO : middleware
};

module.exports = data => handle(
  controller,
  data,
  payload => process.send(payload)
);
