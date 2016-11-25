// eslint-disable-next-line no-underscore-dangle
const _now = require('lodash/now');
// eslint-disable-next-line no-underscore-dangle
const _random = require('lodash/random');
// eslint-disable-next-line no-underscore-dangle
const _sortBy = require('lodash/sortBy');
// eslint-disable-next-line no-underscore-dangle
const _map = require('lodash/map');


const protobuf = require('../protobuf');
const applyOverride = require('./data/applyOverride');

const dcStubs = require('./data/dc');
const lpisisStubs = require('./data/lpisis');

const now = _now();



const stubs = module.exports = Object.assign({}, dcStubs, lpisisStubs);

/*
 * LPISIS
 */

// ReportingParameter
stubs.getReportingParameter = override => applyOverride({
  onboardDate: now,
  groundDate: now + 20,
  convertedValue: _random(1, 100, true),
  rawValue: _random(1, 100, true),
  extractedValue: _random(1, 100, true),
  triggerOnCounter: 6,
  triggerOffCounter: 10,
  monitoringState: 'ok',
  validityState: 0,
  isObsolete: false,
  isNominal: false,
}, override);

stubs.getReportingParameterProtobuf = override => protobuf.encode(
  'lpisis.decommutedParameter.ReportingParameter',
  stubs.getReportingParameter(override)
);

// TCHistory
stubs.getTCHistory = override => applyOverride({
  sendingDate: now,
  tcInProgress: false,
  tcId: _random(1, 10000),
  historyName: 'event name',
  sendType: 2,
  tcNums: 'event nums',
  expectedAck: {
    acceptance: true,
    executionComplete: true,
    executionStart: true,
  },
  successiveAck: {
    scdCop1Ack: 1,
    cop1Ack: 1,
    stationAck: 1,
    missionFailure: 1,
    executionComplete: 1,
    acceptance: 1,
    scdCop1AckRcvDate: now,
    Cop1AckRcvDate: now,
    stationAckRcvDate: now,
    missionFailureRcvDate: now,
    executionCompleteRcvDate: now,
    acceptanceRcvDate: now,
    executionStartRcvDate: now,
    executionStart: 1,
  },
  tc: Buffer.alloc(10, 1),
}, override);

stubs.getTCHistoryProtobuf = override => protobuf.encode(
  'lpisis.tcHistory.TCHistory',
  stubs.getTCHistory(override)
);


/*
 * HSS
 */

// RemoteId
stubs.getRemoteId = (override) => {
  const r = stubs.getDataId(override);
  const filters = (typeof override !== 'undefined' && typeof override.filters !== 'undefined')
    ? override.filters
    : [stubs.getFilter()];
  const flattenFilters = _sortBy(_map(filters,
    ({ fieldName, type, fieldValue }) => `${fieldName}.${type}.${fieldValue}`
  ), e => e);
  let remoteId = `${r.catalog}.${r.parameterName}<${r.comObject}>:${r.sessionId}:${r.domainId}`;
  if (flattenFilters) {
    remoteId += `:${flattenFilters.join(',')}`;
  }
  return remoteId;
};
