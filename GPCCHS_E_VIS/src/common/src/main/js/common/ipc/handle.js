/* eslint consistent-return:0 */
const getLogger = require('../log');
const {
  IPC_RPC_REQUEST,
  IPC_RPC_RESPONSE,
  IPC_MESSAGE,
} = require('../constants');
const { set, pop } = require('../callbacks');

const logger = getLogger('ipc:handle');

function getMethodFromController(controller, method) {
  if (typeof method === 'undefined') {
    return logger.debug('invalid message received (no method)');
  }

  const fn = controller[method];
  if (!fn) {
    return logger.warn(`invalid message received (unknown method '${method}')`);
  }

  return fn;
}

module.exports = (controller, data, replyMethod) => {
  logger.debug('message received', data);

  const { type, queryId, method, payload } = data;
  if (typeof type === 'undefined') {
    return logger.warn('invalid message received (no type)');
  }

  switch (type) {
    case IPC_MESSAGE: {
      const fn = getMethodFromController(controller, method);
      if (fn) {
        logger.debug(`running ${method}[${type}]`);
        fn(payload);
      }
      break;
    }
    case IPC_RPC_REQUEST: {
      if (!queryId) {
        return logger.warn('RPC request without queryId');
      }

      const fn = getMethodFromController(controller, method);
      if (fn) {
        // register answer callback
        set(queryId, replyMethod);

        logger.debug(`running ${method}[${type}]`);
        fn(queryId, payload);
      }

      break;
    }
    case IPC_RPC_RESPONSE: {
      if (!queryId) {
        return logger.warn('RPC response without queryId');
      }

      const fn = pop(queryId);
      if (fn) {
        logger.debug(`running registered callback on ${type}`);
        fn(payload);
      }

      break;
    }
    default:
      logger.warn(`invalid message received (unknown type ${type})`);
  }
};
