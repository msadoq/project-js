// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Add types.proto in dc - Add parse/stringify mechanism to configurationManager
// VERSION : 1.1.2 : FA : #6798 : 16/06/2017 : Several changes : - Lint pass - Modify stub to use encode/decode of adapters (row AND protobuf) - Add a new stubs.js file to load the stubs present in the adapters plugins
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : FA : #6798 : 21/06/2017 : Fix side effect due to stringify/parse parameters in forked process
// VERSION : 1.1.2 : FA : #6993 : 21/06/2017 : Fix packaging : replace parameters.get('IS_BUNDLED') by process.env.IS_BUNDLED
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Merge branch 'dev' into dbrugne-lifecycle
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Fix DC stub last and range query responses (/!\ ProtobufJS return a default value for optionnal enum(), you should use .hasOwnProperty() on decoded payload to test the presence or not of a field)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Repair stubProcess dc in standalone mode (npm run start:dc:stub)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Remove forgotten console.log . .
// END-HISTORY
// ====================================================================

/* eslint-disable complexity, "DV6 TBC_CNES This function act as a switch case controller" */

const { resolve } = require('path');
const adapter = require('../utils/adapters');
const stubs = require('../utils/stubs');
const parameters = require('../common/configurationManager');

parameters.init(resolve(__dirname, '../..'));
adapter.registerGlobal();
stubs.loadStubs();
const _each = require('lodash/each');
const _omit = require('lodash/omit');

const logger = require('../common/logManager')('stubs:utils');
const zmq = require('common/zmq');
const constants = require('../constants');
const protobuf = require('../utils/adapters');

const stubData = stubs.getStubData();

const isParameterSupported = require('./utils/isParameterSupported');
const sendDomainData = require('./utils/sendDomainData');
const sendPubSubData = require('./utils/sendPubSubData');
const sendArchiveData = require('./utils/sendArchiveData');
const sendObsoleteEventData = require('./utils/sendObsoleteEventData');
const sendAlarmAckData = require('./utils/sendAlarmAckData');
const sendSessionData = require('./utils/sendSessionData');
const sendFmdGet = require('./utils/sendFmdGet');
const sendFmdCreate = require('./utils/sendFmdCreate');
const sendSessionTime = require('./utils/sendSessionTime');
const sendMasterSession = require('./utils/sendMasterSession');
const sendSDBData = require('./utils/sendSDBData');

process.title = 'gpcchs_dc_stub';

const versionDCComProtocol = parameters.get('VERSION_DC_COM_PROTOCOL');

let subscriptions = {};
let timeBasedQueries = [];
let obsoleteEventQueries = [];
let alarmAcks = [];

// Push Helpers
const pushSuccess = (queryId) => {
  zmq.push('stubData', [
    null,
    stubData.getResponseHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getSuccessStatusProtobuf(),
  ]);
};
const pushError = (queryId = '', reason = '') => {
  logger.error('STUB ERROR', reason);
  zmq.push('stubData', [
    null,
    stubData.getResponseHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getErrorStatusProtobuf(),
    stubData.getStringProtobuf(reason),
  ]);
};
// Message Controller
const onHssMessage = (...args) => {
  logger.debug('onHssMessage');
  const header = adapter.decode('dc.dataControllerUtils.Header', args[0]);
  const queryId = adapter.decode('dc.dataControllerUtils.String', args[1]).string;
  switch (header.messageType) {
    case constants.MESSAGETYPE_FMD_GET_QUERY: {
      logger.info('push fmd get data');
      return sendFmdGet(
        queryId,
        args[2],
        adapter.decode('dc.dataControllerUtils.FMDGet', args[2]).serializedOid,
        zmq,
        versionDCComProtocol
      );
    }

    case constants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY: {
      logger.info('handle create document');
      return sendFmdCreate(
        queryId,
        args[2],
        adapter.decode('dc.dataControllerUtils.FMDCreateDocument', args[2]),
        zmq,
        versionDCComProtocol
      );
    }

    case constants.MESSAGETYPE_LOG_SEND: {
      logger.info('handle log');
      const { uid, arguments: a } = adapter.decode('dc.dataControllerUtils.SendLog', args[2]);
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Stub file, output on console"
      return console.log(`DC EMULATE LOG MANAGER: ${uid}`, a);
    }

    case constants.MESSAGETYPE_SESSION_TIME_QUERY: {
      logger.info('push session time');
      return sendSessionTime(
        queryId,
        args[2],
        adapter.decode('dc.dataControllerUtils.SessionGetTime', args[2]).id,
        zmq,
        versionDCComProtocol
      );
    }

    case constants.MESSAGETYPE_SESSION_MASTER_QUERY: {
      logger.info('push master session');
      return sendMasterSession(queryId, args[2], zmq, versionDCComProtocol);
    }

    case constants.MESSAGETYPE_DOMAIN_QUERY: {
      logger.info('push domains data');
      return sendDomainData(queryId, args[2], zmq, versionDCComProtocol);
    }

    case constants.MESSAGETYPE_SESSION_QUERY: {
      logger.info('push sessions data');
      return sendSessionData(queryId, args[2], zmq, versionDCComProtocol);
    }

    case constants.MESSAGETYPE_TIMEBASED_QUERY: {
      const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
      if (!isParameterSupported(dataId)) {
        logger.warn('query of unsupported parameter sent to DC stub', dataId);
        return pushError(
          queryId,
          `parameter ${dataId.parameterName} not yet supported by stub`
        );
      }
      const interval = adapter.decode('dc.dataControllerUtils.TimeInterval', args[3]);
      const queryArguments = adapter.decode(
        'dc.dataControllerUtils.QueryArguments', args[4]
      );
      const isLast = (queryArguments.getLastType === constants.GETLASTTYPE_GET_LAST);
      const queryKey = JSON.stringify({ dataId, queryArguments });
      timeBasedQueries.push({
        queryKey,
        queryId,
        dataId,
        timeInterval: interval,
        isLast,
        versionDCCom: versionDCComProtocol,
      });
      logger.silly('query registered', dataId.parameterName, interval);
      return pushSuccess(queryId);
    }

    case constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION: {
      const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
      let parameter = `${dataId.catalog}.${dataId.parameterName}<${dataId.comObject}>`;
      if (!isParameterSupported(dataId)) {
        if (!dataId.catalog && !dataId.parameterName && dataId.comObject) {
          // TODO To improve : Special case, subscription for a whole com object
          parameter = 'Reporting.GENE_AM_CCSDSAPID<ReportingParameter>';
        } else {
          logger.warn('subscription of unsupported parameter sent to DC stub', dataId);
          return pushError(
            queryId,
            `parameter ${dataId.parameterName} not yet supported by stub`
          );
        }
      }
      const action = protobuf.decode('dc.dataControllerUtils.Action', args[3]).action;
      if (action === constants.SUBSCRIPTIONACTION_ADD) {
        subscriptions[parameter] = {
          queryId,
          dataId,
          versionDCCom: versionDCComProtocol,
        };
        logger.debug('subscription added', parameter);
      }
      if (action === constants.SUBSCRIPTIONACTION_DELETE) {
        subscriptions = _omit(subscriptions, parameter);
        logger.debug('subscription removed', parameter);
      }
      return pushSuccess(queryId);
    }

    case constants.MESSAGETYPE_ALARM_ACK: {
      const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
      const comObject = dataId.comObject;
      const alarms = args.slice(3)
        .map(rawAlarm => (
          adapter.decode(
            `dc.dataControllerUtils.${comObject}`, rawAlarm
          )
        ));

      alarmAcks.push({ dataId, queryId, alarms });
      logger.silly('alarmAck registered', comObject, '(', alarms.length, ')');

      return pushSuccess(queryId);
    }

    default:
      return pushError(queryId, `Unknown message type ${header.messageType}`);
  }
};

const onHssMessageADE = (...args) => {
  logger.debug('onHssMessageADE');
  const { method, requestId } = adapter.decode('dc.dataControllerUtils.ADEHeader', args[0]);
  // const header = adapter.decode('dc.dataControllerUtils.Header', args[0]);
  // const queryId = adapter.decode('dc.dataControllerUtils.String', args[1]).string;
  const queryId = requestId;
  switch (method) {
    case constants.ADE_FMD_GET: {
      logger.info('push fmd get data');
      return sendFmdGet(
        queryId,
        args[1],
        adapter.decode('dc.dataControllerUtils.FMDGet', args[1]).serializedOid,
        zmq,
        versionDCComProtocol
      );
    }

    case constants.ADE_FMD_CREATE_DOCUMENT: {
      logger.info('handle create document');
      return sendFmdCreate(
        queryId,
        args[1],
        adapter.decode('dc.dataControllerUtils.FMDCreateDocument', args[1]),
        zmq,
        versionDCComProtocol
      );
    }

    case constants.ADE_LOG: {
      logger.info('handle log');
      const { uid, arguments: a } = adapter.decode('dc.dataControllerUtils.SendLog', args[1]);
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Stub file, output on console"
      return console.log(`DC EMULATE LOG MANAGER: ${uid}`, a);
    }

    case constants.ADE_SESSION_TIME: {
      logger.info('push session time');
      return sendSessionTime(
        queryId,
        args[1],
        adapter.decode('dc.dataControllerUtils.SessionGetTime', args[1]).id,
        zmq,
        versionDCComProtocol
      );
    }

    case constants.ADE_SESSION_MASTER: {
      logger.info('push master session');
      logger.info('queryId', queryId);
      return sendMasterSession(queryId, args[1], zmq, versionDCComProtocol);
    }

    case constants.ADE_DOMAIN_QUERY: {
      logger.info('push domains data');
      return sendDomainData(queryId, args[1], zmq, versionDCComProtocol);
    }

    case constants.ADE_SESSION: {
      logger.info('push sessions data');
      return sendSessionData(queryId, args[1], zmq, versionDCComProtocol);
    }

    case constants.ADE_TIMEBASED_QUERY: {
      const {
        sessionId,
        domainId,
        objectName,
        catalogName,
        itemName,
        timeInterval,
        sortFieldName,
        sortOrder,
        getLastNumber,
        filters,
        providerFlow: provider,
      } = protobuf.decode('dc.dataControllerUtils.ADETimebasedQuery', args[1]);

      const dataId = {
        sessionId,
        domainId,
        catalog: catalogName,
        comObject: objectName,
        parameterName: itemName,
        provider,
      };

      const queryArguments = {
        sortFieldName,
        sortOrder,
        filters,
        getLastNumber,
      };

      const isLast = (getLastNumber && getLastNumber === 1);

      const queryKey = JSON.stringify({ dataId, queryArguments });
      if (itemName === 'OBSOLETE_PARAMETER') {
        obsoleteEventQueries.push({
          queryKey,
          queryId,
          dataId,
          timeInterval,
          isLast,
          versionDCCom: versionDCComProtocol,
          rawBuffer: args[1],
        });
        logger.silly('obsolete event query registered', dataId.parameterName, timeInterval);
      } else {
        timeBasedQueries.push({
          queryKey,
          queryId,
          dataId,
          timeInterval,
          isLast,
          versionDCCom: versionDCComProtocol,
          rawBuffer: args[1],
        });
        logger.silly('time based query registered', dataId.parameterName, timeInterval);
      }
      // return pushSuccessADE(queryId);
      return logger.debug(`Send dc : ${constants.MESSAGETYPE_TIMEBASED_QUERY}`);
    }

    case constants.ADE_TIMEBASED_SUBSCRIPTION: {
      const decoded = protobuf.decode('dc.dataControllerUtils.ADETimebasedSubscription', args[1]);

      const dataId = {
        sessionId: decoded.sessionId,
        domainId: decoded.domainId,
        catalog: decoded.catalogName,
        comObject: decoded.objectName,
        parameterName: decoded.itemName,
      };

      let parameter = `${dataId.catalog}.${dataId.parameterName}<${dataId.comObject}>:${dataId.sessionId}:${dataId.domainId}`;
      if (!isParameterSupported(dataId)) {
        if (!dataId.catalog && !dataId.parameterName && dataId.comObject) {
          // TODO To improve : Special case, subscription for a whole com object
          parameter = 'Reporting.GENE_AM_CCSDSAPID<ReportingParameter>';
        } else {
          return logger.warn('subscription of unsupported parameter sent to DC stub', dataId);
        }
      }

      if (decoded.action === constants.SUBSCRIPTIONACTION_ADD) {
        subscriptions[parameter] = {
          queryId,
          dataId,
          rawBuffer: args[1],
          versionDCCom: versionDCComProtocol,
        };
        logger.info('subscription added', parameter);
      }
      if (decoded.action === constants.SUBSCRIPTIONACTION_DELETE) {
        subscriptions = _omit(subscriptions, parameter);
        logger.debug('subscription removed', parameter);
      }
      return logger.debug(`Dc sent: ${constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION}`);
    }

    case constants.ADE_ALARM_ACK: {
      /* const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
      const comObject = dataId.comObject;
      const alarms = args.slice(3).map(rawAlarm => (
        adapter.decode(
          `dc.dataControllerUtils.${comObject}`, rawAlarm
        )
      ));

      alarmAcks.push({ dataId, queryId, alarms });
      logger.silly('alarmAck registered', comObject, '(', alarms.length, ')'); */

      return logger.silly('MESSAGETYPE ALARM ACK');
    }

    case constants.ADE_SDB_QUERY: {
      const decoded = protobuf.decode('dc.dataControllerUtils.ADESDBQuery', args[1]);
      logger.info(decoded);
      return sendSDBData(queryId, args[1], zmq, decoded);
    }

    default:
      return logger.error(queryId, `Unknown message type ${method}`);
  }
};

const onHssMessageVersion = {
  [constants.DC_COM_V1]: onHssMessage,
  [constants.DC_COM_V2]: onHssMessageADE,
};

function dcCall() {
  logger.silly('dcCall call', Object.keys(subscriptions).length, timeBasedQueries.length);

  // sendDcStatus(zmq); // TODO : replace with action to trigger from client GUI

  // pub/sub
  _each(subscriptions, (subscription) => {
    logger.debug(`push pub/sub data for ${subscription.dataId.parameterName}`);
    sendPubSubData(
      subscription.queryId,
      subscription.dataId, zmq,
      subscription.versionDCCom,
      subscription.rawBuffer
    );
  });

  // time based queries
  _each(timeBasedQueries, (query) => {
    logger.debug(`push archive data for ${query.dataId.parameterName}`);
    sendArchiveData(
      query.queryKey,
      query.queryId,
      query.dataId,
      query.timeInterval,
      query.isLast,
      zmq,
      query.versionDCCom,
      query.rawBuffer
    );
  });
  timeBasedQueries = [];

  // obsolete events queries
  _each(obsoleteEventQueries, (query) => {
    logger.debug(`push archive data for ${query.dataId.parameterName}`);
    sendObsoleteEventData(
      query.queryKey,
      query.queryId,
      query.dataId,
      query.timeInterval,
      query.isLast,
      zmq,
      query.versionDCCom,
      query.rawBuffer
    );
  });
  obsoleteEventQueries = [];

  // alarmAcks
  _each(alarmAcks, (alarmAck) => {
    logger.debug(`push alarmAck data for ${alarmAck.alarms.length} alarms`);
    sendAlarmAckData(alarmAck, zmq);
  });
  alarmAcks = [];

  return nextDcCall(); // eslint-disable-line no-use-before-define
}

function nextDcCall() {
  setTimeout(dcCall, constants.DC_STUB_FREQUENCY);
}

zmq.open(
  {
    stubdcrep: {
      type: 'pull',
      role: 'server',
      url: parameters.get('ZMQ_GPCCDC_PUSH'),
      handler: onHssMessageVersion[versionDCComProtocol],
    },
    stubData: {
      type: 'push',
      role: 'client',
      url: parameters.get('ZMQ_GPCCDC_PULL'),
    },
  },
  (err) => {
    if (err) {
      throw err;
    }

    logger.info('sockets opened');
    if (process.send) { // only when started as child process
      process.send({ [constants.CHILD_PROCESS_READY_MESSAGE_TYPE_KEY]: true });
    }

    nextDcCall();
  }
);
