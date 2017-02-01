import { ipcRenderer } from 'electron';
import { v4 } from 'uuid';
import globalConstants from 'common/constants';
import getLogger from 'common/log';
import { set } from 'common/callbacks';

const logger = getLogger('main:ipc');

const commands = {
  main: {
    rpc: (method, payload, callback) => {
      logger.debug(`sending rpc call ${method} to main`);
      const queryId = v4();
      set(queryId, callback);
      ipcRenderer.send('windowRequest', {
        type: globalConstants.IPC_RPC_REQUEST,
        queryId,
        method,
        payload,
      });
    },
    message: (method, payload) => {
      logger.debug(`sending message ${method} to server`);
      ipcRenderer.send('windowRequest', {
        type: globalConstants.IPC_MESSAGE,
        method,
        payload,
      });
    },
    reloadSessions: (callback) => {
      commands.main.rpc(globalConstants.IPC_METHOD_RELOAD_SESSIONS, null, callback);
    },
    serverDebug: (callback) => {
      commands.main.rpc(globalConstants.IPC_METHOD_SERVER_DEBUG, null, callback);
    },
    getSessionTime: (sessionId, callback) => {
      commands.main.rpc(globalConstants.IPC_METHOD_SESSION_TIME, sessionId, callback);
    },
    openView: ({ windowId, viewPath }) => {
      console.log('openView in renderer');
      commands.main.message(globalConstants.IPC_METHOD_OPEN_VIEW, {
        windowId,
        viewPath
      });
    },
    openPage: ({ windowId, filePath }) =>
      commands.main.message(globalConstants.IPC_METHOD_OPEN_PAGE, {
        windowId,
        filePath
      }),
    openWorkspace: ({ filePath }) =>
      commands.main.message(globalConstants.IPC_METHOD_OPEN_WORKSPACE, {
        filePath
      })
  },
};

export default commands;
