const zmq = require('common/zmq');
const constants = require('../../../constants');

const handle = require('../../../common/ipc/handle');
const reply = require('../../../common/ipc/reply');

const onReduxCurrentState = require('./onReduxCurrentState');
const onReduxDispatch = require('./onReduxDispatch');
const onCacheCleanup = require('./onCacheCleanup');
const onProductLog = require('./onProductLog');

const pushToDc = args => zmq.push('dcPush', args);

const controller = {
  [constants.IPC_METHOD_REDUX_CURRENT_STATE]: (...args) => onReduxCurrentState(reply, ...args),
  [constants.IPC_METHOD_REDUX_DISPATCH]: onReduxDispatch,
  [constants.IPC_METHOD_CACHE_CLEANUP]: (...args) => onCacheCleanup(pushToDc, ...args),
  [constants.IPC_METHOD_PRODUCT_LOG]: (...args) => onProductLog(pushToDc, ...args), // TODO : middleware
};

module.exports = data => handle(
  controller,
  data,
  payload => process.send(payload)
);
