import v4 from 'uuid';
import _memoize from 'lodash/fp/memoize';
import _uniqueId from 'lodash/fp/uniqueId';
import zmq from 'common/zmq';
import { encode } from 'common/protobuf';
import constants from '../constants';
import { set as setCallback } from '../common/callbacks';
import getLogger from '../common/logManager';

const logger = getLogger('main:ipc');

const getDcHeader = _memoize(
  type => encode('dc.dataControllerUtils.Header', { messageType: type })
);

const commands = {
  main: {
    rpc: (method, payload, callback) => {
      logger.debug(`sending rpc call ${method} to main`);
      const queryId = v4();
      setCallback(queryId, callback);
      process.send({
        type: constants.IPC_RPC_REQUEST,
        queryId,
        method,
        payload,
      });
    },
    message: (method, payload) => {
      logger.debug(`sending message ${method} to main`);
      process.send({ type: constants.IPC_MESSAGE, method, payload });
    },
    sendReduxPatch: (action) => {
      commands.main.message(constants.IPC_METHOD_REDUX_PATCH, action);
    },
  },
  dc: {
    rpc: (method, trames, callback) => {
      logger.debug(`sending rpc call ${method} to dc`);
      const queryId = v4();
      setCallback(queryId, callback);
      zmq.push('dcPush', [
        getDcHeader(method),
        encode('dc.dataControllerUtils.String', { string: queryId }),
      ].concat(trames));
    },
    message: (method, trames) => {
      logger.debug(`sending message ${method} to dc`);
      zmq.push('dcPush', [
        getDcHeader(method),
      ].concat(trames));
    },
    requestMasterSession: (callback) => {
      commands.dc.rpc(constants.MESSAGETYPE_SESSION_MASTER_QUERY, undefined, callback);
    },
    requestSessionTime: (sessionId, callback) => {
      commands.dc.rpc(constants.MESSAGETYPE_SESSION_TIME_QUERY, [
        encode('dc.dataControllerUtils.SessionGetTime', { id: sessionId }),
      ], callback);
    },
    requestSessions: (callback) => {
      commands.dc.rpc(constants.MESSAGETYPE_SESSION_QUERY, undefined, callback);
    },
    requestDomains: (callback) => {
      commands.dc.rpc(constants.MESSAGETYPE_DOMAIN_QUERY, undefined, callback);
    },
    sendProductLog: (uid, args) => {
      commands.dc.message(constants.MESSAGETYPE_LOG_SEND, [
        encode('dc.dataControllerUtils.String', { string: _uniqueId('log_') }),
        encode('dc.dataControllerUtils.SendLog', { uid, arguments: args }),
      ]);
    },
    requestFmdGet: (oid, callback) => {
      commands.dc.rpc(constants.MESSAGETYPE_FMD_GET_QUERY, [
        encode('dc.dataControllerUtils.FMDGet', { serializedOid: oid }),
      ], callback);
    },
    requestFmdCreate: (name, path, mimeType, callback) => {
      commands.dc.rpc(constants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY, [
        encode('dc.dataControllerUtils.FMDCreateDocument', { name, path, mimeType }),
      ], callback);
    },
  },
};

module.exports = commands;
