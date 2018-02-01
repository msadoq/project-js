// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : Implement timebased data subscription observer
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Implement timebased data subscription observer
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : First draft implementation of dataRequesting management on server
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Refactor DC error handling (direct dispatch from server)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Refacto onFmdCreateData and onFmdGetData dc controllers
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess + replace old IPC productLog
// END-HISTORY
// ====================================================================

import v4 from 'uuid';
import _memoize from 'lodash/fp/memoize';
import _uniqueId from 'lodash/fp/uniqueId';
import zmq from 'common/zmq';
import { encode } from '../utils/adapters';
import { getStore } from './store';
import { set as setCallback } from '../common/callbacks';
import getLogger from '../common/logManager';
import { operators } from '../common/operators';

import { add as addMessage } from '../store/actions/messages';
import constants from '../constants';

const _map = require('lodash/map');

const logger = getLogger('server:ipc');

const getDcHeader = _memoize(
  type => encode('dc.dataControllerUtils.Header', { messageType: type })
);

const getDcDataId = _memoize(
  (flatDataId, dataId) => encode('dc.dataControllerUtils.DataId', dataId),
  flatDataId => flatDataId // memoize key
);

let staticDcProtobufs;
function getStaticProtobuf(type) {
  if (!staticDcProtobufs) {
    staticDcProtobufs = {
      add: encode('dc.dataControllerUtils.Action', {
        action: constants.SUBSCRIPTIONACTION_ADD,
      }),
      delete: encode('dc.dataControllerUtils.Action', {
        action: constants.SUBSCRIPTIONACTION_DELETE,
      }),
    };
  }

  return staticDcProtobufs[type];
}

function onDcResponseCallback(err, flatDataId = '') {
  if (err) {
    logger.error(`Error from Data Consumer (${flatDataId}): ${err}`);
    getStore().dispatch(addMessage('global', 'danger', err));
  }
}

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

      return queryId;
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
    requestSessionTime: (sessionId, callback) => { // unused, TO DELETE ?
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
    requestAck: (flatDataId, dataId, alarmAckRequests, callback) => {
      const payloads = alarmAckRequests.map(alarmAckRequest => (
        encode(`dc.dataControllerUtils.${dataId.comObject}`, alarmAckRequest)
      ));

      const trames = [
        getDcDataId(flatDataId, dataId),
        ...payloads,
      ];

      commands.dc.rpc(constants.MESSAGETYPE_ALARM_ACK, trames, callback);
    },
    requestTimebasedQuery: (flatDataId, dataId, interval, args) => commands.dc.rpc(
      constants.MESSAGETYPE_TIMEBASED_QUERY,
      [
        getDcDataId(flatDataId, dataId),
        encode('dc.dataControllerUtils.TimeInterval', {
          startTime: { ms: interval[0] },
          endTime: { ms: interval[1] },
        }),
        encode('dc.dataControllerUtils.QueryArguments',
          {
            ...args,
            filters: _map(args.filters, filter => ({
              ...filter,
              operator: operators[filter.operator],
            })),
          }
        ),
      ],
      err => (onDcResponseCallback(err, flatDataId))
    ),
    requestSubscriptionAdd: (flatDataId, dataId) => {
      commands.dc.rpc(constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION, [
        getDcDataId(flatDataId, dataId),
        getStaticProtobuf('add'),
      ], err => (onDcResponseCallback(err, flatDataId)));
    },
    requestSubscriptionDelete: (flatDataId, dataId) => {
      commands.dc.rpc(constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION, [
        getDcDataId(flatDataId, dataId),
        getStaticProtobuf('delete'),
      ], err => (onDcResponseCallback(err, flatDataId)));
    },
  },
};

module.exports = commands;
