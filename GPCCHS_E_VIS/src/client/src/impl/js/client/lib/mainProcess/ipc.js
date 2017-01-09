import { v4 } from 'node-uuid';
import globalConstants from 'common/constants';
import getLogger from 'common/log';
import { set } from 'common/callbacks';
import { get } from './childProcess';

const logger = getLogger('main:ipc');

const commands = {
  renderer: {
    rpc: (event, payload, callback) => {},
    message: (event, payload) => {},
  },
  server: {
    rpc: (method, payload, callback) => {
      const proc = get(globalConstants.CHILD_PROCESS_SERVER);
      if (!proc) {
        return logger.warn('server process is not inited yet for rpc');
      }

      logger.debug(`sending rpc call ${method} to server`);
      const queryId = v4();
      set(queryId, callback);
      proc.send({
        type: globalConstants.IPC_RPC_REQUEST,
        queryId,
        method,
        payload,
      });
    },
    message: (method, payload) => {
      const proc = get(globalConstants.CHILD_PROCESS_SERVER);
      if (!proc) {
        return logger.warn('server process is not yet inited for message');
      }

      logger.debug(`sending message ${method} to server`);
      proc.send({ type: globalConstants.IPC_MESSAGE, method, payload });
    },
    requestDomains: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_DOMAINS_REQUEST, null, callback);
    },
    requestSessions: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_SESSIONS_REQUEST, null, callback);
    },
    requestPathFromOId: (oId, callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_FILEPATH_REQUEST, { oId }, callback);
    },
    requestData: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_TIMEBASED_PULL, null, callback);
    },
  },
};

export default commands;
