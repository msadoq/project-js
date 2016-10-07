const debug = require('../io/debug')('stub:dc');
const _ = require('lodash');
const zmq = require('../io/zmq');
const protobuf = require('../protobuf/index');
const stubData = require('./data');
const constants = require('../constants');

let subscriptions = {}; // realtime
let queries = []; // archive

const generateRealtimePayloads = () => {
  const payloads = [];
  for (let i = 0; i < 200; i += 1) {
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

const realtimePayloads = generateRealtimePayloads();

// stub supported parameters list
const supportedParameters = [
  'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ0<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ1<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ2<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ3<ReportingParameter>',
  'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
];

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
  debug.debug('STUB ERROR', reason);
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
  ];
  _.each(domains, domain => buffer.push(stubData.getDomainProtobuf(domain)));
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
  _.each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });
  zmq.push('stubData', buffer);
};
const pushTimebasedPubSubData = (dataId, payloads) => {
  const buffer = [
    null,
    stubData.getTimebasedPubSubDataHeaderProtobuf(),
    stubData.getDataIdProtobuf(dataId),
  ];
  _.each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });
  zmq.push('stubData', buffer);
};

// Message Controller
const onHssMessage = (...args) => {
  debug.debug('onHssMessage');
  let header;
  try {
    header = protobuf.decode('dc.dataControllerUtils.Header', args[0]);
    const queryId = protobuf.decode('dc.dataControllerUtils.String', args[1]).string;
    const type = header.messageType;
    try {
      switch (type) {
        case constants.MESSAGETYPE_DOMAIN_QUERY:
          {
            const domains = [
              stubData.getDomain(),
              stubData.getDomain({ name: 'fr.cnes.sat1.ion', domainId: 42, parentDomainId: 27 }),
            ];
            debug.info('push Domains', domains);
            return pushDomainData(queryId, domains);
          }
        case constants.MESSAGETYPE_TIMEBASED_QUERY:
          {
            const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
            if (typeof isParameterSupported(dataId) === 'undefined') {
              return pushError(queryId, 'parameter not yet supported by stub');
            }
            const interval = protobuf.decode('dc.dataControllerUtils.TimeInterval', args[3]);
            const filters = [];
            _.each(_.slice(args, 4), (filter) => { filters.push(filter); });
            queries.push({ queryId, dataId, interval, filters });
            debug.debug('query registered', dataId.parameterName, interval);
            return pushSuccess(queryId);
          }
        case constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION:
          {
            const dataId = protobuf.decode('dc.dataControllerUtils.DataId', args[2]);
            const parameter = isParameterSupported(dataId);
            if (typeof parameter === 'undefined') {
              return pushError(queryId, 'parameter not yet supported by stub');
            }
            const action = protobuf.decode('dc.dataControllerUtils.Action', args[3]).action;
            if (action === constants.SUBSCRIPTIONACTION_ADD) {
              subscriptions[parameter] = dataId;
              debug.debug('subscription added', parameter);
            }
            if (action === constants.SUBSCRIPTIONACTION_DELETE) {
              subscriptions = _.omit(subscriptions, parameter);
              debug.debug('subscription removed', parameter);
            }
            return pushSuccess(queryId);
          }
        default:
          throw new Error('Unknown messageType');
      }
    } catch (decodeException) {
      debug.debug('decode exception');
      debug.debug(decodeException);
      return pushError(queryId, `Unable to decode message of type ${type}`);
    }
  } catch (clientMsgException) {
    debug.debug('decode exception');
    debug.debug(clientMsgException);
    return pushError(undefined, `Unable to decode message ${header.messageType}`);
  }
};

const emulateDc = () => {
  debug.verbose('emulateDc call', Object.keys(subscriptions).length, queries.length);
  // push realtime on each parameter
  _.each(subscriptions, (dataId) => {
    // const payloads = [];
    // push randomly 1 to 4 parameters
    // for (let i = 0; i <= _.random(0, 3); i += 1) {
    //   // fake time repartition
    //   const timestamp = Date.now() - (i * 10);
    //   payloads.push(
    //     {
    //       timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    //       payload: stubData.getReportingParameterProtobuf({
    //         groundDate: timestamp + 20,
    //         onboardDate: timestamp,
    //         // values already vary in stubData helper
    //       }),
    //     }
    //   );
    // }
    const TIME = 1420102800000;
    let timestamp = TIME;
    const payloads = _.map(realtimePayloads, (pl) => {
      timestamp += 1;
      return {
        timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
        payload: pl.payload,
      };
    });
    debug.debug('push data from subscription');
    pushTimebasedPubSubData(dataId, payloads);
  });

  if (!queries.length) {
    return setTimeout(emulateDc, 5000);
  }

  // push queries
  debug.info('pushing queries');
  _.each(queries, (query) => {
    const from = query.interval.lowerTs.ms;
    const to = query.interval.upperTs.ms;
    if (to <= from) {
      return debug.error('Unvalid interval');
    }
    const payloads = [];
    for (let i = from; i <= to; i += 2000) {
      const timestamp = i;
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
    debug.info('push data from query');
    return pushTimebasedArchiveData(query.queryId, query.dataId, true, payloads);
  });
  queries = [];

  return setTimeout(emulateDc, 5000);
};

zmq.open(
  {
    stubdcrep: {
      type: 'pull',
      url: process.env.ZMQ_GPCCDC_PUSH,
      handler: onHssMessage,
    },
    stubData: {
      type: 'push',
      url: process.env.ZMQ_GPCCDC_PULL,
    },
  },
  (err) => {
    if (err) {
      return;
    }

    debug.info('sockets opened');

    setTimeout(emulateDc, 5000);
  }
);
