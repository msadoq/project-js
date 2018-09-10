// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper
//  modules
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : Implement timebased data subscription observer
// VERSION : 1.1.2 : DM : #6700 : 23/06/2017 : First draft implementation of dataRequesting
//  management on server
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Implement timebased data subscription observer
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : First draft implementation of dataRequesting
//  management on server
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Refactor DC error handling (direct dispatch from
//  server)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Refacto onFmdCreateData and onFmdGetData dc
//  controllers
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess +
//  replace old IPC productLog
// VERSION : 2.0.0 : FA : #8022 : 27/09/2017 : Add good filter operator in request to dc
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update server process and data injection for alarms
// VERSION : 2.0.0 : FA : #8606 : 17/10/2017 : Display error popup when dc return a response error
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// VERSION : 2.0.0 : DM : #5806 : 03/11/2017 : Manage ackrequests in stub .
// VERSION : 2.0.0 : FA : #8699 : 17/11/2017 : Fix bug 'Display entryPoint name in data consumer
//  errors'
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2215 : 05/03/2018 : Small fixes due to test with DC over ssh
//  connection
// VERSION : 2.0.0 : FA : ISIS-FT-2215 : 05/03/2018 : Fix filters and provider flow
// VERSION : 2.0.0 : FA : ISIS-FT-2215 : 06/03/2018 : Fix provider flow wrong value
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0.2 : FA : #11609 : 18/04/2018 : Fix entry point unit retrieval
// VERSION : 2.0.0.3 : FA : #13116 : 15/06/2018 : Fix retrieve last parameters request
// END-HISTORY
// ====================================================================

/* eslint-disable no-use-before-define */
import v4 from 'uuid';
import _memoize from 'lodash/fp/memoize';
import _uniqueId from 'lodash/fp/uniqueId';
import _get from 'lodash/get';
import zmq from 'common/zmq';
import { encode } from '../utils/adapters';
import { getStore } from './store';
import { set as setCallback } from '../common/callbacks';
import getLogger from '../common/logManager';
import { operators } from '../common/operators';
import { get as getConf } from '../common/configurationManager';
import { createSillyLog, decorateWithSillyLog } from './sillyLog';

import { add as addMessage } from '../store/actions/messages';
import constants from '../constants';

const _map = require('lodash/map');

const logger = getLogger('server:ipc');
const sillyLog = createSillyLog(logger);

const versionDCComProtocol = getConf('VERSION_DC_COM_PROTOCOL');

const getDcHeader = _memoize(
  type => encode('dc.dataControllerUtils.Header', { messageType: type })
);

/*-----------------*/
/* ----------------ADE---------------- */
/*----------------*/

const getDcHeaderADE = (method, requestId) => encode('dc.dataControllerUtils.ADEHeader', { method, requestId });
const getPusHeader = (messageType, { sessionId, domainId, pusService, pusServiceApid }) =>
  encode('isis.pusModelEditorMessages.HeaderStructure', { messageType, sessionId, domainId, pusService, pusServiceApid });

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
const dcVersionMap = {
  [constants.DC_COM_V1]: {
    rpc: (method, trames, callback) => {
      logger.info(`sending rpc call ${method} to dc`);
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
  [constants.DC_COM_V2]: {
    rpc: (method, trames, callback) => {
      logger.debug(`sending    samplingNumber: data.samplingNumber,
      rpc call ${method} to dc`);
      const queryId = v4();
      setCallback(queryId, callback);
      zmq.push('dcPush', [
        getDcHeaderADE(method, queryId),
      ].concat(trames));

      return queryId;
    },
    message: (method, trames) => {
      logger.debug(`sending message ${method} to dc`);
      const queryId = v4();
      zmq.push('dcPush', [
        getDcHeaderADE(method, queryId),
      ].concat(trames));
    },
    requestMasterSession: (callback) => {
      commands.dc.rpc(constants.ADE_SESSION_MASTER, undefined, callback);
    },
    requestSessionTime: (sessionId, callback) => { // unused, TO DELETE ?
      commands.dc.rpc(constants.ADE_SESSION_TIME, [
        encode('dc.dataControllerUtils.SessionGetTime', { id: sessionId }),
      ], callback);
    },
    requestSessions: (callback) => {
      commands.dc.rpc(constants.ADE_SESSION, undefined, callback);
    },
    requestDomains: (callback) => {
      commands.dc.rpc(constants.ADE_DOMAIN_QUERY, undefined, callback);
    },
    sendProductLog: (uid, args) => {
      if (args[1] !== undefined) {
        commands.dc.message(constants.ADE_LOG, [
          encode('dc.dataControllerUtils.SendLog', { uid, arguments: args }),
        ]);
      }
    },
    requestFmdGet: (oid, callback) => {
      commands.dc.rpc(constants.ADE_FMD_GET, [
        encode('dc.dataControllerUtils.FMDGet', { serializedOid: oid }),
      ], callback);
    },
    requestFmdCreate: (name, path, mimeType, callback) => {
      commands.dc.rpc(constants.ADE_FMD_CREATE_DOCUMENT, [
        encode('dc.dataControllerUtils.FMDCreateDocument', { name, path, mimeType }),
      ], callback);
    },
    requestAck: (flatDataId, dataId, alarmAckRequests, callback) => {
      const { sessionId, domainId } = dataId;

      // const trames = [
      //   getDcDataId(flatDataId, dataId),
      //   ...payloads,
      // ];
      return commands.dc.rpc(constants.ADE_ALARM_ACK, [
        encode('dc.dataControllerUtils.ADEAck', {
          sessionId,
          domainId,
          // genericPayload : [ { header : {providerId, comObjectType, instanceOid}, payload}]
          genericPayload: alarmAckRequests.map(({ oid, ackRequest }) => ({
            header: {
              providerId: 0,
              comObjectType: dataId.comObject,
              instanceOid: oid,
            },
            payload: encode(`dc.dataControllerUtils.${dataId.comObject}`, { oid, ackRequest }),
          })),
        }),
      ], callback);
    },
    requestTimebasedQuery: (flatDataId, dataId, interval, args, samplingNumber) => (
      commands.dc.rpc(
        constants.ADE_TIMEBASED_QUERY,
        [
          encode('dc.dataControllerUtils.ADETimebasedQuery', {
            sessionId: dataId.sessionId,
            domainId: dataId.domainId,
            objectName: dataId.comObject,
            providerFlow: _get(dataId, 'provider', ''),
            catalogName: dataId.catalog,
            itemName: dataId.parameterName,
            timeInterval: {
              startTime: { ms: interval[0] },
              endTime: { ms: interval[1] },
            },
            filters: _map(args.filters, filter => ({
              ...filter,
              operator: operators[filter.operator],
            })),
            getLastNumber: args.getLastNumber,
            samplingNumber,
          }),
        ],
        err => (onDcResponseCallback(err, flatDataId))
      )
    ),
    requestSubscriptionAdd: (flatDataId, dataId) => (
      commands.dc.rpc(constants.ADE_TIMEBASED_SUBSCRIPTION, [
        encode('dc.dataControllerUtils.ADETimebasedSubscription', {
          sessionId: dataId.sessionId,
          domainId: dataId.domainId,
          objectName: dataId.comObject,
          catalogName: dataId.catalog,
          itemName: dataId.parameterName,
          action: constants.SUBSCRIPTIONACTION_ADD,
          providerFlow: _get(dataId, 'provider', ''),
        }),
      ], err => (onDcResponseCallback(err, flatDataId)))
    ),
    requestSubscriptionDelete: (flatDataId, dataId) => (
      commands.dc.rpc(constants.ADE_TIMEBASED_SUBSCRIPTION, [
        encode('dc.dataControllerUtils.ADETimebasedSubscription', {
          sessionId: dataId.sessionId,
          domainId: dataId.domainId,
          objectName: dataId.comObject,
          catalogName: dataId.catalog,
          itemName: dataId.parameterName,
          action: constants.SUBSCRIPTIONACTION_DELETE,
          providerFlow: _get(dataId, 'provider', ''),
        }),
      ], err => (onDcResponseCallback(err, flatDataId)))
    ),
    retrieveSDBCatalogs: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_CATALOGS,
      args,
      callback
    ),
    retrieveSDBCatalogsItems: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_CATALOG_ITEMS,
      args,
      callback
    ),
    retrieveSDBCatalogsItemComObject: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_COMOBJECT,
      args,
      callback
    ),
    retrieveSDBCatalogItemFieldUnit: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_FIELD_UNIT,
      args,
      callback
    ),
    retrieveSDBCatalogItemExists: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_EXISTS,
      args,
      callback
    ),
    retrieveSatelliteItems: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_SATELLITE_ITEMS,
      args,
      callback
    ),
    retrieveCatalogItemStructure: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_STRUCTURE,
      args,
      callback
    ),
    retrieveCatalogItemMetadata: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_METADATA,
      args,
      callback
    ),
    retrieveReportingItemPackets: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_REPORTING_ITEM_PACKETS,
      args,
      callback
    ),
    retrieveApids: (args, callback) => commands.dc.requestSDBQuery(
      constants.ADE_SDB_RETRIEVE_APIDS,
      args,
      callback
    ),
    requestSDBQuery: (method, args, callback) => (
      commands.dc.rpc(constants.ADE_SDB_QUERY, [
        encode('dc.dataControllerUtils.ADESDBQuery', {
          method,
          sessionId: args.sessionId,
          domainId: args.domainId,
          catalogName: args.catalogName,
          catalogItemName: args.catalogItemName,
          comObject: args.comObject,
          fieldName: args.fieldName,
        }),
      ],
        callback
      )
    ),
  },
};

const pusCommands = {
  rpc: (method, trames, header, callback) => {
    logger.info(`sending rpc call ${method} to pus`);
    const queryId = v4();
    setCallback(queryId, callback);
    zmq.push('pusPush', [
      getPusHeader(method, header),
    ].concat(trames));

    return queryId;
  },
  initialize: (header, forReplay, firstTime, lastTime, continuous, callback) => commands.pus.rpc(
    constants.PUS_INITIALIZE,
    encode('isis.pusModelEditorMessages.InitialiseStructure', { forReplay, firstTime, lastTime, continuous }),
    header,
    callback
  ),
  subscribe: (header, callback) => commands.pus.rpc(
    constants.PUS_SUBSCRIBE,
    [],
    header,
    callback
  ),
  unsubscribe: (header, callback) => commands.pus.rpc(
    constants.PUS_UNSUBSCRIBE,
    [],
    header,
    callback
  ),
  compare: (header, firstDate, secondDate, callback) => commands.pus.rpc(
    constants.PUS_COMPARE,
    encode('isis.pusModelEditorMessages.CompareStructure', { firstDate: Date.now(), secondDate: Date.now() + 10 }),
    header,
    callback
  ),
  reset: (header, initialisationMode, resetType, date, callback) => commands.pus.rpc(
    constants.PUS_RESET,
    encode('isis.pusModelEditorMessages.InitialiseStructure', { initialisationMode: 0, resetType: 0, date: Date.now() }),
    header,
    callback
  ),
};

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
    sendSingleton: (singleton) => {
      commands.main.message(constants.IPC_METHOD_SINGLETON_PATCH, singleton);
    },
    sendReduxPatch: (action) => {
      commands.main.message(constants.IPC_METHOD_REDUX_PATCH, action);
    },
  },
  dc: decorateWithSillyLog(dcVersionMap[versionDCComProtocol], sillyLog, ['rpc', 'message']),
  pus: pusCommands,
};
module.exports = commands;
