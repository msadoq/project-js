const _ = require('lodash');
const parseDataFullName = require('./parseDataFullName');
const protobuf = require('../protobuf');
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

stubs.getDataId = override => applyOverride({
  parameterName: 'ATT_BC_STR1STRRFQ1',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: 100,
  domainId: 200,
}, override);

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

stubs.getDataQuery = override => applyOverride({
  id: 'my_unique_id',
  dataId: stubs.getDataId(),
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
  dataId: stubs.getDataId(),
}, override);

stubs.getNewDataMessage = override => applyOverride({
  dataId: stubs.getDataId(),
  payloads: [
    {
      timestamp: { ms: now },
      payload: protobuf.encode(
        'lpisis.decommutedParameter.ReportingParameter',
        stubs.getReportingParameter()
      ),
    },
    {
      timestamp: { ms: now },
      payload: protobuf.encode(
        'lpisis.decommutedParameter.ReportingParameter',
        stubs.getReportingParameter()
      ),
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
