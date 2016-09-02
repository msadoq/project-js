const debug = require('../io/debug')('stub:dc');
const _ = require('lodash');
const zmq = require('../io/zmq');
const protobuf = require('../protobuf/index');
const stubData = require('./data');

let subscriptions = {}; // realtime
let queries = []; // archive

// stub supported parameters list
const supportedParameters = [
  'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ0<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ1<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ2<ReportingParameter>',
  'Reporting.ATT_BC_STR1STRSAQ3<ReportingParameter>',
  'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
];

/**
 * Receive request for both realtime subscriptions and data query
 * @param buffer
 */
const onHssMessage = buffer => {
  let type;
  let payload;
  try {
    payload = protobuf.decode('dc.dataControllerUtils.DataQuery', buffer);
    type = 'dataQuery';
  } catch (dataQueryException) {
    try {
      payload = protobuf.decode('dc.dataControllerUtils.DataSubscribe', buffer);
      type = 'dataSubscribe';
    } catch (dataSubscribeException) {
      return zmq.respond('stubdcrep', protobuf.encode('dc.dataControllerUtils.DcResponse', {
        id: null,
        status: 'ERROR',
        reason: 'Unable to decode protobuf',
      }));
    }
  }

  const parameter
    = `${payload.dataId.catalog}.${payload.dataId.parameterName}<${payload.dataId.comObject}>`;

  if (supportedParameters.indexOf(parameter) === -1) {
    return zmq.respond('stubdcrep', protobuf.encode('dc.dataControllerUtils.DcResponse', {
      id: null,
      status: 'ERROR',
      reason: 'Unsupported stub parameter',
    }));
  }

  if (type === 'dataQuery') {
    // add query to process list
    queries.push(payload);
    debug.debug('query registered', parameter, payload.interval);
  } else if (type === 'dataSubscribe' && payload.action === 'ADD') {
    // add realtime parameter
    subscriptions[parameter] = payload.dataId;
    debug.debug('subscription added', parameter);
  } else if (type === 'dataSubscribe' && payload.action === 'DELETE') {
    // remove realtime parameter
    subscriptions = _.omit(subscriptions, parameter);
    debug.debug('subscription removed', parameter);
  }

  return zmq.respond('stubdcrep', protobuf.encode('dc.dataControllerUtils.DcResponse', {
    id: payload.id,
    status: 'OK',
  }));
};

const pushData = (dataId, payloads) => {
  if (!payloads.length) {
    return undefined;
  }

  const buffers = _.map(payloads, pl => ({
    timestamp: { ms: pl.timestamp },
    payload: stubData.getReportingParameterProtobuf({
      groundDate: pl.timestamp + 20,
      onboardDate: pl.timestamp,
      // values already vary in stubData helper
    }),
  }));

  const buffer = protobuf.encode('dc.dataControllerUtils.NewDataMessage', {
    dataId,
    payloads: buffers,
  });
  return zmq.push('stubData', buffer);
};

const emulateDc = () => {
  debug.debug('emulateDc call', Object.keys(subscriptions).length, queries.length);
  // push realtime on each parameter
  _.each(subscriptions, dataId => {
    const payloads = [];
    // push randomly 1 to 4 parameters
    for (let i = 0; i <= _.random(0, 3); i++) {
      // fake time repartition
      payloads.push({ timestamp: Date.now() - (i * 10) });
    }

    return pushData(dataId, payloads);
  });

  if (!queries.length) {
    return;
  }

  // push queries
  queries = _.dropWhile(queries, query => {
    const from = query.interval.lowerTs.ms;
    const to = query.interval.upperTs.ms;
    if (to <= from) {
      return debug.error('Unvalid interval');
    }

    const payloads = [];
    for (let i = from; i <= to; i += 2000) {
      payloads.push({ timestamp: i });
    }

    return pushData(query.dataId, payloads);
  });
};

module.exports = callback => {
  zmq.open({
    stubdcrep: {
      type: 'rep',
      url: process.env.ZMQ_GPCCDC_REQ,
      handler: onHssMessage,
    },
    stubData: {
      type: 'push',
      url: process.env.ZMQ_GPCCDC_DATA,
    },
  }, err => {
    if (err) {
      return callback(err);
    }

    debug.info('sockets opened');

    setInterval(emulateDc, 500);

    return callback(null);
  });
};
