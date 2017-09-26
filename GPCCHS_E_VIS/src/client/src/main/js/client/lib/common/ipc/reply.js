// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

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
