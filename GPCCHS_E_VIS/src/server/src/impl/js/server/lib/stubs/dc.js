const debug = require('../io/debug')('stub:dc');
const {
  random: _random,
  each: _each,
  omit: _omit,
} = require('lodash');
const zmq = require('../io/zmq');
const protobuf = require('../protobuf/index');
const stubData = require('./data');
const constants = require('../constants');
const supportedParameters = require('./supportedParameters');

require('dotenv-safe').load();

const DC_FREQUENCY = 100;
const MAX_SUBSCRIPTION_PUSH = 3;
const PARAMETER_VALUE_STEP = 2000;

let subscriptions = {}; // realtime
let queries = []; // archive

const generateRealtimePayloads = () => {
  const payloads = [];
  for (let i = 0; i < _random(0, MAX_SUBSCRIPTION_PUSH); i += 1) {
    // fake time repartition
    const timestamp = Date.now() - (i * 10);
    payloads.push(
      {
        timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
        payload: stubData.getReportingParameterProtobuf({
          groundDate: timestamp + 20,
          onboardDate: timestamp,
          // values already vary in stubData helper
        }),
      }
    );
  }
  return payloads;
};

const isParameterSupported = (dataId) => {
  const parameter = `${dataId.catalog}.${dataId.parameterName}<${dataId.comObject}>`;
  if (supportedParameters.indexOf(parameter) === -1) {
    return undefined;
  }
  return parameter;
};

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
const pushDomainData = (queryId, domains) => {
  const buffer = [null,
    stubData.getDomainDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getDomainsProtobuf(domains),
  ];
  zmq.push('stubData', buffer);
};
const pushTimebasedArchiveData = (queryId, dataId, isLast, payloads) => {
  const buffer = [
    null,
    stubData.getTimebasedArchiveDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getDataIdProtobuf(dataId),
    stubData.getBooleanProtobuf(isLast),
  ];
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });
  zmq.push('stubData', buffer);
};
const pushTimebasedPubSubData = (queryId, dataId, payloads) => {
  const buffer = [
    null,
    stubData.getTimebasedPubSubDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getDataIdProtobuf(dataId),
  ];
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });
  zmq.push('stubData', buffer);
};

// Message Controller
const onHssMessage = (...args) => {
  debug.info('onHssMessage');
  let header = '';
  try {
    header = protobuf.decode('dc.dataControllerUtils.Header', args[0]);
    const queryId = protobuf.decode('dc.dataControllerUtils.String', args[1]).string;
    const type = header.messageType;
    try {
      switch (type) {
        case constants.MESSAGETYPE_DOMAIN_QUERY:
          {
            const domains = stubData.getDomains();
            debug.info('push Domains', domains);
            return pushDomainData(queryId, domains);
          }
        case constants.MESSAGETYPE_TIMEBASED_QUERY:
          {
            const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
            if (typeof isParameterSupported(dataId) === 'undefined') {
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
            queries.push({ queryId, dataId, interval, queryArguments });
            debug.verbose('query registered', dataId.parameterName, interval);
            return pushSuccess(queryId);
          }
        case constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION:
          {
            const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
            const parameter = isParameterSupported(dataId);
            if (typeof parameter === 'undefined') {
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
          return pushError(queryId, `Unknown message type ${type}`);
      }
    } catch (decodeException) {
      debug.error('decode exception', decodeException);
      return pushError(queryId, `Unable to decode message of type ${type}`);
    }
  } catch (clientMsgException) {
    debug.error('decode exception', clientMsgException);
    return pushError(undefined, `Unable to decode message ${header.messageType}`);
  }
};

const emulateDc = () => {
  debug.info('emulateDc call', Object.keys(subscriptions).length, queries.length);

  // pub/sub
  _each(subscriptions, ({ queryId, dataId }) => {
    debug.verbose('push data from subscription');
    pushTimebasedPubSubData(queryId, dataId, generateRealtimePayloads());
  });

  if (!queries.length) {
    return setTimeout(emulateDc, DC_FREQUENCY);
  }

  // queries
  debug.debug('pushing queries');
  _each(queries, (query) => {
    const from = query.interval.startTime.ms;
    const to = query.interval.endTime.ms;
    if (to <= from) {
      return debug.error('Unvalid interval');
    }
    const payloads = [];
    for (let i = from; i <= to; i += PARAMETER_VALUE_STEP) {
      const ts = i;
      payloads.push(
        {
          timestamp: stubData.getTimestampProtobuf({ ms: ts }),
          payload: stubData.getReportingParameterProtobuf({
            groundDate: ts + 20,
            onboardDate: ts,
            // values already vary in stubData helper
          }),
        }
      );
    }
    debug.debug('push data from query');
    return pushTimebasedArchiveData(query.queryId, query.dataId, true, payloads);
  });
  queries = [];

  return setTimeout(emulateDc, DC_FREQUENCY);
};

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
    setTimeout(emulateDc, DC_FREQUENCY);
  }
);
