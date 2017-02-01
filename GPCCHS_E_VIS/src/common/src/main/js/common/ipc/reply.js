const { pop } = require('../callbacks');
const getLogger = require('../log');
const { IPC_RPC_RESPONSE } = require('../constants');

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
