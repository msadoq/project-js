import { v4 } from 'uuid';
import globalConstants from 'common/constants';
import getLogger from 'common/log';
import { set as setCallback } from 'common/callbacks';
import { get as getChildProcess } from './childProcess';

const logger = getLogger('main:ipc');

const commands = {
  renderer: {
    // not implemented yet
  },
  server: {
    rpc: (method, payload, callback) => {
      const proc = getChildProcess(globalConstants.CHILD_PROCESS_SERVER);
      if (!proc) {
        return logger.warn('server process is not inited yet for rpc');
      }

      logger.debug(`sending rpc call ${method} to server`);
      const queryId = v4();
      setCallback(queryId, callback);
      proc.send({
        type: globalConstants.IPC_RPC_REQUEST,
        queryId,
        method,
        payload,
      });
    },
    message: (method, payload) => {
      const proc = getChildProcess(globalConstants.CHILD_PROCESS_SERVER);
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
    requestSessionTime: (sessionId, callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_SESSION_TIME, { sessionId }, callback);
    },
    requestMasterSession: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_MASTER_SESSION, null, callback);
    },
    requestFmdGet: (oid, callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_FMD_GET, { oid }, callback);
    },
    requestFmdCreate: (fileFolder, fileName, mimeType, callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_FMD_CREATE, {
        path: fileFolder,
        name: fileName,
        mimeType,
      }, callback);
    },
    requestData: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_TIMEBASED_PULL, null, callback);
    },
    requestServerDebug: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_SERVER_DEBUG, null, callback);
    },
    sendProductLog: (uid, ...args) => {
      commands.server.message(globalConstants.IPC_METHOD_PRODUCT_LOG, {
        uid,
        args,
      });
    },
  },
};

export default commands;
