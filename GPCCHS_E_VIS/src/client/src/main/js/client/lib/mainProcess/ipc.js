// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Add module onDataPull to get data from cache
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move common/callback and common/ipc modules in client sub-component
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix lint error in mainProcess/ipc
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : #5838 : 16/06/2017 : Add a third parameter to childProcess to allow args passing to child process
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Remove health management obsolete code
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Fix mainProcess ipc : dont ignore action when webContent is loading
// VERSION : 1.1.2 : DM : #6700 : 20/07/2017 : Remove obsolete onServerDebug interface, ipcs and model
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about FMD_GET/FMD_CREATE and RELOAD_SESSIONS/GET_SESSION_TIME
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Remove serverDebug ipc . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about documents .
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : [FT:#7145] Add refactoring comments in ipc and controllers (main, server, renderer)
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Remove useless ipc in mainProcess + serverProcess controllers
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

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
    requestData: (queries, callback) => { // TODO : wait data consumption before remove
      commands.server.rpc(globalConstants.IPC_METHOD_TIMEBASED_PULL, { queries }, callback);
    },
    sendProductLog: (uid, ...args) => {  // TODO middleware
      commands.server.message(globalConstants.IPC_METHOD_PRODUCT_LOG, {
        uid,
        args,
      });
    },
  },
};

export default commands;
