import { ipcRenderer } from 'electron';
import { v4 } from 'uuid';
import getLogger from '../common/logManager';
import globalConstants from '../constants';
import { set } from '../common/callbacks';

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
    requestReduxCurrentState: (callback) => {
      commands.main.rpc(globalConstants.IPC_METHOD_REDUX_CURRENT_STATE, null, callback);
    },
    sendReduxDispatch: (action) => {
      commands.main.message(globalConstants.IPC_METHOD_REDUX_DISPATCH, action);
    },
    resolveLink: ({ link, path, sessionId, domainId }, callback) => // TODO middleware)
      commands.main.message(globalConstants.IPC_METHOD_RESOLVE_LINK, {
        link,
        path,
        sessionId,
        domainId,
      }, callback),
    getRteDomains: (sessionId, callback) => // TODO middleware
      commands.main.message(globalConstants.IPC_METHOD_GET_RTE_DOMAINS, {
        sessionId,
      }, callback),
    getRteCatalogs: (sessionId, domainId, callback) => // TODO middleware
      commands.main.message(globalConstants.IPC_METHOD_GET_RTE_CATALOGS, {
        sessionId,
        domainId,
      }, callback),
    getRteItemNames: (catalog, version, callback) => // TODO middleware
      commands.main.message(globalConstants.IPC_METHOD_GET_RTE_ITEM_NAMES, {
        catalog,
        version,
      }, callback),
    openRteItem: (sessionId, domainId, catalog, version, namespace, name, key, callback) => // TODO middleware
      commands.main.message(globalConstants.IPC_METHOD_OPEN_RTE_ITEM, {
        sessionId,
        domainId,
        catalog,
        version,
        namespace,
        name,
        key,
      }, callback),
    focusRteItem: (sessionId, domainId, catalog, version, namespace, name, key, callback) => // TODO middleware
      commands.main.message(globalConstants.IPC_METHOD_FOCUS_RTE_ITEM, {
        sessionId,
        domainId,
        catalog,
        version,
        namespace,
        name,
        key,
      }, callback),
    resolveRteLink: ({ link, sessionId, domainId }, callback) => // TODO middleware
      commands.main.message(globalConstants.IPC_METHOD_RESOLVE_RTE_LINK, {
        link,
        sessionId,
        domainId,
      }, callback),
  },
};

export default commands;
