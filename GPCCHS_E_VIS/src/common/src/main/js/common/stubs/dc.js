const _each = require('lodash/each');
const _omit = require('lodash/omit');
const { bind: bindMainIpc } = require('../ipc');
const logger = require('../log')('GPCCHS:STUBS:DC');
const zmq = require('../zmq');
const globalConstants = require('../constants');
const protobuf = require('../protobuf/index');
const stubData = require('./data');

const createQueryKey = require('./dc/createQueryKey');
const isParameterSupported = require('./dc/isParameterSupported');
const sendDomainData = require('./dc/sendDomainData');
const sendPubSubData = require('./dc/sendPubSubData');
const sendArchiveData = require('./dc/sendArchiveData');
const sendSessionData = require('./dc/sendSessionData');
const sendFilepathData = require('./dc/sendFilepathData');

const monitoring = require('../monitoring');

monitoring.start();

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
    case globalConstants.MESSAGETYPE_FILEPATH_QUERY: {
      logger.info('push filepath data');
      const oid = protobuf.decode('dc.dataControllerUtils.String', args[2]).string;
      return sendFilepathData(queryId, oid, zmq);
    }
    case globalConstants.MESSAGETYPE_DOMAIN_QUERY: {
      logger.info('push domain data');
      return sendDomainData(queryId, zmq);
    }
    case globalConstants.MESSAGETYPE_SESSION_QUERY: {
      logger.info('push session data');
      return sendSessionData(queryId, zmq);
    }
    case globalConstants.MESSAGETYPE_TIMEBASED_QUERY: {
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
      const queryKey = createQueryKey(dataId, queryArguments);
      queries.push({ queryKey, queryId, dataId, interval, queryArguments });
      logger.verbose('query registered', dataId.parameterName, interval);
      return pushSuccess(queryId);
    }
    case globalConstants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION: {
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
      if (action === globalConstants.SUBSCRIPTIONACTION_ADD) {
        subscriptions[parameter] = {
          queryId,
          dataId,
        };
        logger.debug('subscription added', parameter);
      }
      if (action === globalConstants.SUBSCRIPTIONACTION_DELETE) {
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
  logger.verbose('dcCall call', Object.keys(subscriptions).length, queries.length);

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
  setTimeout(dcCall, globalConstants.DC_STUB_FREQUENCY);
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
      return;
    }

    // bind IPC channel with main process
    bindMainIpc();

    logger.info('sockets opened');
    nextDcCall();
  }
);
