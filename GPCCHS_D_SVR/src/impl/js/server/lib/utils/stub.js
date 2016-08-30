const _ = require('lodash');
const parseDataFullName = require('./parseDataFullName');
const constants = require('../constants');

const now = _.now();

// Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>
// Reporting.ATT_BC_STR1STRSAQ0<ReportingParameter>
// Reporting.ATT_BC_STR1STRSAQ1<ReportingParameter>
// Reporting.ATT_BC_STR1STRSAQ2<ReportingParameter>
// Reporting.ATT_BC_STR1STRSAQ3<ReportingParameter>
// Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>

function applyOverride(payload, override) {
  if (!override) {
    return payload;
  }

  return _.defaults({}, override, payload);
}

const stubs = module.exports = {};

stubs.getDataQuery = override => applyOverride({
  id: 'my_unique_id',
  dataId: {
    parameterName: 'ATT_BC_STR1STRRFQ1',
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    sessionId: 100,
    domainId: 200,
  },
  interval: {
    lowerTs: { ms: now },
    upperTs: { ms: now },
  },
}, override);

stubs.getDcResponse = override => applyOverride({
  id: 'my_unique_id',
  status: 'ERROR',
  reason: 'My reason',
}, override);

stubs.getDataSubscribe = override => applyOverride({
  action: 'ADD',
  id: 'my_unique_id',
  dataId: {
    parameterName: 'ATT_BC_STR1STRRFQ1',
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    sessionId: 100,
    domainId: 200,
  },
}, override);

stubs.getNewDataMessage = override => applyOverride({
  dataId: {
    parameterName: 'ATT_BC_STR1STRRFQ1',
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    sessionId: 100,
    domainId: 200,
  },
  payloads: [
    {
      timestamp: { ms: now },
      payload: new Buffer(10), // TODO implement nested reportingParameter
    },
  ],
}, override);

stubs.getSubscription = override => {
  let subscription = {
    dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
    catalog: 'Reporting',
    parameter: 'ATT_BC_STR1VOLTAGE',
    type: 'ReportingParameter',
    field: 'rawValue',
    domainId: 0,
    timeLineType: constants.TIMELINETYPE_SESSION,
    sessionId: 100,
    setFileName: '',
    subscriptionState: constants.SUBSCRIPTIONSTATE_PLAY,
    visuSpeed: 0,
    visuWindow: {
      lower: now - (3600 * 1000),
      upper: now + (3600 * 1000),
    },
    filter: [],
  };

  if (override) {
    _.forEach(override, (value, key) => {
      // remove this key
      if (typeof value === 'undefined') {
        subscription = _.omit(subscription, [key]);
        return;
      }

      // dataFullName
      if (key === 'dataFullName') {
        const parsed = parseDataFullName(value);
        Object.assign(subscription, {
          dataFullName: parsed.dataFullName,
          catalog: parsed.catalog,
          parameter: parsed.parameter,
          type: parsed.type,
        });
        return;
      }

      // override key value
      subscription[key] = value;
    });
  }

  return subscription;
};

stubs.getReportingParameter = override => applyOverride({
  onboardDate: now,
  groundDate: now + 20,
  convertedValue: _.random(1, 100, true),
  rawValue: _.random(1, 100, true),
  extractedValue: _.random(1, 100, true),
  triggerOnCounter: 6,
  triggerOffCounter: 10,
  monitoringState: 'INFORMATIONAL',
  validityState: 'INVALID',
  isObsolete: false,
  isNominal: false,
}, override);

stubs.getDcData = override => {
  const parameter = {
    meta: {
      fullDataId: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
      catalog: 'Reporting',
      parameter: 'ATT_BC_STR1VOLTAGE',
      type: 'ReportingParameter',
      oid: `000100010100010001${_.random(1, 100000000)}`,
      session: 100,
      timestamp: now,
    },
    data: {
      onboardDate: now,
      groundDate: now + 20,
      convertedValue: _.random(1, 100, true),
      rawValue: _.random(1, 100, true),
      extractedValue: _.random(1, 100, true),
      triggerOnCounter: '6',
      triggerOffCounter: '8',
      monitoringState: 0,
      validityState: 0,
      isObsolete: false,
      isNominal: false,
    },
  };

  if (override) {
    _.forEach(override.meta, (value, key) => {
      // remove this key
      if (typeof value === 'undefined') {
        parameter.meta = _.omit(parameter.meta, [key]);
        return;
      }

      // dataFullName
      if (key === 'fullDataId') {
        const parsed = parseDataFullName(value);
        Object.assign(parameter.meta, {
          fullDataId: parsed.dataFullName,
          catalog: parsed.catalog,
          parameter: parsed.parameter,
          type: parsed.type,
        });
        return;
      }

      // override key value
      parameter.meta[key] = value;
    });

    _.forEach(override.data, (value, key) => {
      // remove this key
      if (typeof value === 'undefined') {
        parameter.data = _.omit(parameter.data, [key]);
        return;
      }

      // override key value
      parameter.data[key] = value;
    });
  }

  return parameter;
};
