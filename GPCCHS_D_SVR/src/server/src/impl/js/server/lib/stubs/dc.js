const debug = require('../io/debug')('stub:dc');
const _ = require('lodash');
const zmq = require('../io/zmq');
const protobuf = require('../protobuf/index');
const stubData = require('./data');

let subscriptions = {}; // realtime
let queries = []; // archive
let domainQueried = false; // domains were queried
// stub supported parameters list
const supportedParameters = [
  'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ0<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ1<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ2<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ3<ReportingParameter>',
  'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
];

const wrapServerMessage = (dataType, payload) =>
  protobuf.encode('dc.dataControllerUtils.DcServerMessage', {
    messageType: dataType,
    payload,
  });

const onHssMessage = (buffer) => {
  debug.debug('onHssMessage');
  let dcClientMessage;
  let payload;
  let type;
  try {
    dcClientMessage = protobuf.decode('dc.dataControllerUtils.DcClientMessage', buffer);
    type = dcClientMessage.messageType;
    try {
      switch (dcClientMessage.messageType) {
        case 'DATA_QUERY':
          payload = protobuf.decode(
            'dc.dataControllerUtils.DataQuery',
            dcClientMessage.payload
          );
          break;
        case 'DATA_SUBSCRIBE':
          payload = protobuf.decode(
            'dc.dataControllerUtils.DataSubscribe',
            dcClientMessage.payload
          );
          break;
        case 'DOMAIN_QUERY':
          payload = protobuf.decode(
            'dc.dataControllerUtils.DomainQuery',
            dcClientMessage.payload
          );
          break;
        default:
          throw new Error('Unknown messageType for dcClientMessage');
      }
    } catch (decodeException) {
      debug.debug('decode exception');
      return zmq.push('stubData', [
        null,
        wrapServerMessage('DC_RESPONSE', protobuf.encode('dc.dataControllerUtils.DcResponse', {
          id: null,
          status: 'ERROR',
          reason: `Unable to decode dcClientMessage payload of type ${type}`,
        })),
      ]);
    }
  } catch (clientMsgException) {
    debug.debug(clientMsgException);
    return zmq.push('stubData', [
      null,
      wrapServerMessage('DC_RESPONSE', protobuf.encode('dc.dataControllerUtils.DcResponse', {
        id: null,
        status: 'ERROR',
        reason: 'Unable to decode dcClientMessage',
      })),
    ]);
  }

  let parameter;

  if (type === 'DATA_QUERY' || type === 'DATA_SUBSCRIBE') {
    parameter =
      `${payload.dataId.catalog}.${payload.dataId.parameterName}<${payload.dataId.comObject}>`;

    if (supportedParameters.indexOf(parameter) === -1) {
      return zmq.push('stubData', [
        null,
        wrapServerMessage('DC_RESPONSE', protobuf.encode('dc.dataControllerUtils.DcResponse', {
          id: dcClientMessage.id,
          status: 'ERROR',
          reason: 'Unsupported stub parameter',
        })),
      ]);
    }
  }

  if (type === 'DATA_QUERY') {
    // add query to process list
    queries.push(payload);
    debug.debug('query registered', parameter, payload.interval);
  } else if (type === 'DATA_SUBSCRIBE' && payload.action === 'ADD') {
    // add realtime parameter
    subscriptions[parameter] = payload.dataId;
    debug.debug('subscription added', parameter);
  } else if (type === 'DATA_SUBSCRIBE' && payload.action === 'DELETE') {
    // remove realtime parameter
    subscriptions = _.omit(subscriptions, parameter);
    debug.debug('subscription removed', parameter);
  } else if (type === 'DOMAIN_QUERY') {
    domainQueried = true;
    return undefined;
  } else {
    throw new Error('Neither a Data Query nor a supported data subscribe nor a domain query');
  }

  return zmq.push('stubData', [null,
    wrapServerMessage('DC_RESPONSE', protobuf.encode('dc.dataControllerUtils.DcResponse', {
      id: payload.id,
      status: 'OK',
    }))]
  );
};

const pushData = (dataId, payloads) => {
  if (!payloads.length) {
    return undefined;
  }

  const buffers = _.map(payloads, pl => ({
    payload: stubData.getReportingParameterProtobuf({
      groundDate: pl.timestamp + 20,
      onboardDate: pl.timestamp,
      // values already vary in stubData helper
    }),
    timestamp: { ms: pl.timestamp },
  }));

  const buffer = wrapServerMessage('NEW_DATA_MESSAGE',
    protobuf.encode('dc.dataControllerUtils.NewDataMessage', {
      dataId,
      payloads: buffers,
      dataSource: 'REAL_TIME',
    })
  );

  return zmq.push('stubData', [null, buffer]);
};

const emulateDc = () => {
  debug.verbose('emulateDc call', Object.keys(subscriptions).length, queries.length);
  // push realtime on each parameter
  _.each(subscriptions, (dataId) => {
    const payloads = [];
    // push randomly 1 to 4 parameters
    for (let i = 0; i <= _.random(0, 3); i += 1) {
      // fake time repartition
      payloads.push({ timestamp: Date.now() - (i * 10) });
    }
    debug.debug('push data from subscription');
    pushData(dataId, payloads);
  });

  if (domainQueried) {
    const buffer = stubData.getWrappedDomainResponseProtobuf();
    debug.debug('push Domains');
    zmq.push('stubData', [null, buffer]);
    domainQueried = false;
  }
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
      payloads.push({ timestamp: i });
    }
    debug.info('push data from query');
    return pushData(query.dataId, payloads);
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
