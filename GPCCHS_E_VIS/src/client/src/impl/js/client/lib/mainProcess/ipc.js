import path from 'path';
import { isString } from 'lodash';
import { v4 } from 'node-uuid';
import { get } from 'common/parameters';
import globalConstants from 'common/constants';
import getLogger from 'common/log';
import { set as setCallback } from 'common/callbacks';
import { get as getChildProcess } from 'common/childProcess';

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
    requestSessionTime: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_GET_SESSION_TIME, null, callback);
    },
    requestPathFromOId: (oId, callback) => {
      if (!isString(oId)) {
        callback('requestPathFromOId error : oId should be a string');
      }
      const resolve = payload => callback(null, payload);
      const getPath = relativePath => resolve(path.resolve(get('FMD_ROOT_DIR'), relativePath));
      switch (oId) {
        case 'page_small': return getPath('pages/pageSmall_with_oid.json');
        case 'view_text_1': return getPath('views/textOne.json');
        case 'view_plot_1': return getPath('views/plotviewOne.json');
        default: return callback('requestPathFromOId not fully implemented yet');
      }
      // commands.server.rpc(globalConstants.IPC_METHOD_FILEPATH_REQUEST, { oId }, callback);
    },
    requestData: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_TIMEBASED_PULL, null, callback);
    },
    requestServerDebug: (callback) => {
      commands.server.rpc(globalConstants.IPC_METHOD_SERVER_DEBUG, null, callback);
    },
  },
};

export default commands;
