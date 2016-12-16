import { pop } from 'common/callbacks';
import getLogger from 'common/log';
import globalConstants from 'common/constants';

import { add as addMessage, addOnce as addOnceMessage } from '../store/actions/messages';

const logger = getLogger('ipc:server');

/**
 * Triggered when server send back an RPC response
 *
 * @param queryId
 * @param data
 * @return {*}
 */
export function handleRpcResponse(queryId, data) {
  const callback = pop(queryId);
  if (!callback) {
    return logger.warn(`response received without corresponding callback (${queryId})`);
  }

  const { err, payload } = data;
  return callback(err, payload);
}

/**
 * Triggered when server uni-directionnal message to client
 *
 * @param event
 * @param payload
 * @param store
 */
export function handleMessage(event, payload, store) {
  switch (event) {
    case globalConstants.EVENT_ERROR: {
      const err = `Error from server: ${payload.reason}`;
      return store.dispatch(addOnceMessage('global', 'danger', err));
    }
    default: {
      const err = `Received not yet implemented event ${event}`;
      logger.error(err);
      return store.dispatch(addMessage('global', 'danger', err));
    }
  }
}

/**
 * Bind a node process 'response' event
 *
 * @param subProcess
 * @param store
 */
export function bind(subProcess, store) {
  serverProcess = subProcess;
  subProcess.on('response', (data) => {
    logger.debug('incoming message', data);
    const { queryId, event, payload } = data;

    if (queryId) {
      return handleRpcResponse(queryId, payload);
    } else if (event) {
      return handleMessage(event, payload, store);
    }

    return logger.warn('invalid message received (no payload)');
  });
}
