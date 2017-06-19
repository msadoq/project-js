import getLogger from '../../common/logManager';
import { IPC_RPC_RESPONSE } from '../../constants';
import { pop } from '../callbacks';

const logger = getLogger('ipc:reply');

module.exports = (queryId, payload) => {
  logger.silly(`replying to ${queryId}`);
  const callback = pop(queryId);
  if (!callback) {
    return logger.warn(`unknown queryId ${queryId}`);
  }

  return callback({
    type: IPC_RPC_RESPONSE,
    queryId,
    payload,
  });
};
