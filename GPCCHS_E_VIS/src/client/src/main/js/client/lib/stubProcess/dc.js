const _each = require('lodash/each');
const _omit = require('lodash/omit');

const path = require('path');
const logger = require('../common/logManager')('stubs:utils');
const zmq = require('common/zmq');
const constants = require('../constants');
const protobuf = require('common/protobuf');

const registerDc = require('common/protobuf/adapters/dc');
const registerLpisis = require('common/protobuf/adapters/lpisis');

const rootPath = process.env.IS_BUNDLED ? __dirname : path.resolve(__dirname, '../..');

registerDc(path.join(rootPath, 'node_modules/common/protobuf/proto/dc')); // Temporary fix for packaging
registerLpisis(path.join(rootPath, 'node_modules/common/protobuf/proto/lpisis')); // Temporary fix for packaging

const stubData = require('common/protobuf/stubs');

const isParameterSupported = require('./utils/isParameterSupported');
const sendDomainData = require('./utils/sendDomainData');
const sendPubSubData = require('./utils/sendPubSubData');
const sendArchiveData = require('./utils/sendArchiveData');
const sendSessionData = require('./utils/sendSessionData');
const sendFmdGet = require('./utils/sendFmdGet');
const sendFmdCreate = require('./utils/sendFmdCreate');
const sendSessionTime = require('./utils/sendSessionTime');
const sendMasterSession = require('./utils/sendMasterSession');

process.title = 'gpcchs_dc_stub';

let subscriptions = {};
let queries = [];

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

  const header = protobuf.decode('dc.dataControllerUtils.Header', args[0]);
  const queryId = protobuf.decode('dc.dataControllerUtils.String', args[1]).string;

  switch (header.messageType) {
    case constants.MESSAGETYPE_FMD_GET_QUERY: {
      logger.info('push fmd get data');
      return sendFmdGet(
        queryId,
        protobuf.decode('dc.dataControllerUtils.FMDGet', args[2]).serializedOid,
        zmq
      );
    }
    case constants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY: {
      logger.info('handle create document');
      return sendFmdCreate(
        queryId,
        protobuf.decode('dc.dataControllerUtils.FMDCreateDocument', args[2]),
        zmq
      );
    }
    case constants.MESSAGETYPE_LOG_SEND: {
      logger.info('handle log');
      const { uid, arguments: a } = protobuf.decode('dc.dataControllerUtils.SendLog', args[2]);
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Stub file, output on console"
      return console.log(`DC EMULATE LOG MANAGER: ${uid}`, a);
    }
    case constants.MESSAGETYPE_SESSION_TIME_QUERY: {
      logger.info('push session time');
      return sendSessionTime(
        queryId,
        protobuf.decode('dc.dataControllerUtils.SessionGetTime', args[2]).id,
        zmq
      );
    }
    case constants.MESSAGETYPE_SESSION_MASTER_QUERY: {
      logger.info('push master session');
      return sendMasterSession(queryId, zmq);
    }
    case constants.MESSAGETYPE_DOMAIN_QUERY: {
      logger.info('push domains data');
      return sendDomainData(queryId, zmq);
    }
    case constants.MESSAGETYPE_SESSION_QUERY: {
      logger.info('push sessions data');
      return sendSessionData(queryId, zmq);
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
      const interval = protobuf.decode('dc.dataControllerUtils.TimeInterval', args[3]);
      const queryArguments = protobuf.decode(
        'dc.dataControllerUtils.QueryArguments', args[4]
      );
      const queryKey = JSON.stringify(dataId, queryArguments);
      queries.push({ queryKey, queryId, dataId, interval, queryArguments });
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
        };
        logger.debug('subscription added', parameter);
      }
      if (action === constants.SUBSCRIPTIONACTION_DELETE) {
        subscriptions = _omit(subscriptions, parameter);
        logger.debug('subscription removed', parameter);
      }
      return pushSuccess(queryId);
    }
    default:
      return pushError(queryId, `Unknown message type ${header.messageType}`);
  }
};

function dcCall() {
  logger.silly('dcCall call', Object.keys(subscriptions).length, queries.length);

  // sendDcStatus(zmq); // TODO : replace with action to trigger from client GUI

  // pub/sub
  _each(subscriptions, ({ queryId, dataId }) => {
    logger.debug(`push pub/sub data for ${dataId.parameterName}`);
    sendPubSubData(queryId, dataId, zmq);
  });

  // queries
  _each(queries, (query) => {
    logger.debug(`push archive data for ${query.dataId.parameterName}`);
    sendArchiveData(
      query.queryKey,
      query.queryId,
      query.dataId,
      query.interval,
      query.queryArguments,
      zmq
    );
  });
  queries = [];

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
      url: process.env.ZMQ_GPCCDC_PUSH,
      handler: onHssMessage,
    },
    stubData: {
      type: 'push',
      role: 'client',
      url: process.env.ZMQ_GPCCDC_PULL,
    },
  },
  (err) => {
    if (err) {
      throw err;
    }

    logger.info('sockets opened');
    process.send({ [constants.CHILD_PROCESS_READY_MESSAGE_TYPE_KEY]: true });

    nextDcCall();
  }
);
