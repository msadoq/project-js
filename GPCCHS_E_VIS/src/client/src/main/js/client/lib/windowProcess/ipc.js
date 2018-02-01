// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #5822 : 16/03/2017 : resolve a rtd link in the inspector
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific TM data
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Add a F1 button in VIMA to open the docu wiki helper
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix drop view, page and workspace
// VERSION : 1.1.2 : DM : #5822 : 03/04/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move common/callback and common/ipc modules in client sub-component
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Change windowProcess health management to dispatch a Redux action directly.
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Remove SAVE_PAGE ipc method .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Replace ipc openPage by askOpenPage redux action
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Clean old code in menuManager/IPC controller
// VERSION : 1.1.2 : DM : #6700 : 20/07/2017 : Remove obsolete onServerDebug interface, ipcs and model
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about openInspector .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about FMD_GET/FMD_CREATE and RELOAD_SESSIONS/GET_SESSION_TIME
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about documents .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Remove serverDebug ipc . .
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : [FT:#7145] Add refactoring comments in ipc and controllers (main, server, renderer)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store folder in mainProcess
// END-HISTORY
// ====================================================================

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
