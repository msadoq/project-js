import getLogger from 'common/logManager';
import {
  IPC_RPC_REQUEST,
  IPC_RPC_RESPONSE,
  IPC_MESSAGE,
} from 'constants';
import { set, pop } from '../callbacks';

const logger = getLogger('ipc:handle');

function getMethodFromController(controller, method) {
  if (typeof method === 'undefined') {
    return logger.warn('invalid message received (no method)');
  }

  const fn = controller[method];
  if (!fn) {
    return logger.warn(`invalid message received (unknown method '${method}')`);
  }

  return fn;
}

module.exports = (controller, data, replyMethod) => {
  logger.silly('message received', data);

  const { type, queryId, method, payload } = data;
  if (typeof type === 'undefined') {
    logger.warn('invalid message received (no type)');
    return;
  }

  switch (type) {
    case IPC_MESSAGE: {
      const fn = getMethodFromController(controller, method);
      if (fn) {
        logger.silly(`running ${method}[${type}]`);
        fn(payload);
      }
      break;
    }
    case IPC_RPC_REQUEST: {
      if (!queryId) {
        logger.warn('RPC request without queryId');
        return;
      }

      const fn = getMethodFromController(controller, method);
      if (fn) {
        // register answer callback
        set(queryId, replyMethod);

        logger.silly(`running ${method}[${type}]`);
        fn(queryId, payload);
      }

      break;
    }
    case IPC_RPC_RESPONSE: {
      if (!queryId) {
        logger.warn('RPC response without queryId');
        return;
      }

      const fn = pop(queryId);
      if (fn) {
        logger.silly(`running registered callback on ${type}`);
        fn(payload);
      }

      break;
    }
    default:
      logger.warn(`invalid message received (unknown type ${type})`);
  }
};
