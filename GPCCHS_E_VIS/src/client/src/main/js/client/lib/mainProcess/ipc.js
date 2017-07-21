import { webContents } from 'electron';
import { v4 } from 'uuid';
import getLogger from '../common/logManager';
import globalConstants from '../constants';
import { set as setCallback } from '../common/callbacks';
import { get as getChildProcess } from '../common/processManager';

const logger = getLogger('main:ipc');

const commands = {
  renderer: {
    message: (method, payload) => {
      webContents.getAllWebContents().forEach((webContent) => {
        if (webContent.isCrashed()) {
          return;
        }

        logger.debug(`sending message ${method} to server`);
        webContent.send('global', { type: globalConstants.IPC_MESSAGE, method, payload });
      });
    },
    sendReduxPatch: (action) => {
      commands.renderer.message(globalConstants.IPC_METHOD_REDUX_PATCH, action);
    },
  },
  server: {
    rpc: (method, payload, callback) => {
      const proc = getChildProcess(globalConstants.CHILD_PROCESS_SERVER);
      if (!proc) {
        logger.warn('server process is not inited yet for rpc');
        return;
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
        logger.warn('server process is not yet inited for message');
        return;
      }

      logger.debug(`sending message ${method} to server`);
      proc.send({ type: globalConstants.IPC_MESSAGE, method, payload });
    },
    requestReduxCurrentState: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_REDUX_CURRENT_STATE, null, callback);
    },
    sendReduxDispatch: (action) => {
      commands.server.message(globalConstants.IPC_METHOD_REDUX_DISPATCH, action);
    },
    requestDomains: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_DOMAINS_REQUEST, null, callback);
    },
    requestSessions: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_SESSIONS_REQUEST, null, callback);
    },
    requestMasterSession: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_MASTER_SESSION, null, callback);
    },
    requestData: (queries, callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_TIMEBASED_PULL, { queries }, callback);
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
