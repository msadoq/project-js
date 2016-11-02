require('dotenv-safe').load();
// eslint-disable-next-line import/no-extraneous-dependencies
const { constants: globalConstants } = require('common');

const debug = require('../io/debug')('stub:dc');
const createQueryKey = require('./dc/createQueryKey');
const isParameterSupported = require('./dc/isParameterSupported');
const sendDomainData = require('./dc/sendDomainData');
const sendPubSubData = require('./dc/sendPubSubData');
const sendArchiveData = require('./dc/sendArchiveData');
const {
  each: _each,
  omit: _omit,
} = require('lodash');
const zmq = require('../io/zmq');
const protobuf = require('../protobuf/index');
const stubData = require('./data');
const constants = require('../constants');

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
  debug.error('STUB ERROR', reason);
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
  debug.debug('onHssMessage');

  const header = protobuf.decode('dc.dataControllerUtils.Header', args[0]);
  const queryId = protobuf.decode('dc.dataControllerUtils.String', args[1]).string;

  switch (header.messageType) {
    case constants.MESSAGETYPE_DOMAIN_QUERY: {
      debug.info('push domain data');
      return sendDomainData(queryId, zmq);
    }
    case constants.MESSAGETYPE_TIMEBASED_QUERY: {
      const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
      if (!isParameterSupported(dataId)) {
        debug.warn('query of unsupported parameter sent to DC stub', dataId);
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
      debug.verbose('query registered', dataId.parameterName, interval);
      return pushSuccess(queryId);
    }
    case constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION: {
      const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
      const parameter = `${dataId.catalog}.${dataId.parameterName}<${dataId.comObject}>`;
      if (!isParameterSupported(dataId)) {
        debug.warn('subscription of unsupported parameter sent to DC stub', dataId);
        return pushError(
          queryId,
          `parameter ${dataId.parameterName} not yet supported by stub`
        );
      }
      const action = protobuf.decode('dc.dataControllerUtils.Action', args[3]).action;
      if (action === constants.SUBSCRIPTIONACTION_ADD) {
        subscriptions[parameter] = {
          queryId,
          dataId,
        };
        debug.debug('subscription added', parameter);
      }
      if (action === constants.SUBSCRIPTIONACTION_DELETE) {
        subscriptions = _omit(subscriptions, parameter);
        debug.debug('subscription removed', parameter);
      }
      return pushSuccess(queryId);
    }
    default:
      return pushError(queryId, `Unknown message type ${header.messageType}`);
  }
};

function dcCall() {
  debug.verbose('dcCall call', Object.keys(subscriptions).length, queries.length);

  // pub/sub
  _each(subscriptions, ({ queryId, dataId }) => {
    debug.debug(`push pub/sub data for ${dataId.parameterName}`);
    sendPubSubData(queryId, dataId, zmq);
  });

  // queries
  _each(queries, (query) => {
    debug.debug(`push archive data for ${query.dataId.parameterName}`);
    sendArchiveData(query.queryKey, query.queryId, query.dataId, query.interval, zmq);
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

    debug.info('sockets opened');
    nextDcCall();
  }
);
