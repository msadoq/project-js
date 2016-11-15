// eslint-disable-next-line no-underscore-dangle
const _now = require('lodash/now');
// eslint-disable-next-line no-underscore-dangle
const _defaultsDeep = require('lodash/defaultsDeep');
// eslint-disable-next-line no-underscore-dangle
const _random = require('lodash/random');
// eslint-disable-next-line no-underscore-dangle
const _sortBy = require('lodash/sortBy');
// eslint-disable-next-line no-underscore-dangle
const _map = require('lodash/map');

const protobuf = require('../protobuf/index');
const globalConstants = require('../constants');

const now = _now();

function applyOverride(payload, override) {
  if (!override) {
    return payload;
  }

  return _defaultsDeep({}, override, payload);
}

const stubs = module.exports = {};

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
  monitoringState: 0,
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
 * DC COMICS
 */

// Action
stubs.getAddAction = () => ({
  action: globalConstants.SUBSCRIPTIONACTION_ADD,
});
stubs.getDeleteAction = () => ({
  action: globalConstants.SUBSCRIPTIONACTION_DELETE,
});

stubs.getAddActionProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Action',
  stubs.getAddAction()
);
stubs.getDeleteActionProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Action',
  stubs.getDeleteAction()
);

// Boolean
stubs.getBoolean = (boolean = false) => ({
  boolean,
});

stubs.getBooleanProtobuf = boolean => protobuf.encode(
  'dc.dataControllerUtils.Boolean',
  stubs.getBoolean(boolean)
);

// DataId
stubs.getDataId = override => applyOverride({
  parameterName: 'ATT_BC_STR1STRRFQ1',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: 100,
  domainId: 200,
}, override);

stubs.getDataIdProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataId',
  stubs.getDataId(override)
);

// Domain
stubs.getDomain = override => applyOverride({
  itemNamespace: 'Domains',
  name: 'fr.cnes.sat1',
  oid: '0051525005151000565215465660515',
  domainId: 27,
  parentDomainId: 98,
}, override);

stubs.getDomainProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Domain',
  stubs.getDomain(override)
);

// Domains
stubs.getDomains = override => applyOverride({
  domains: [
    stubs.getDomain(),
    stubs.getDomain({ name: 'fr.cnes.sat1.ion', domainId: 42, parentDomainId: 27 }),
  ],
}, override);

stubs.getDomainsProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Domains',
  stubs.getDomain(override)
);

// Filter
stubs.getFilter = override => applyOverride({
  fieldName: 'extractedValue',
  type: globalConstants.FILTERTYPE_GT,
  fieldValue: 42,
}, override);

stubs.getFilterProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Filter',
  stubs.getFilter(override)
);

// Header
stubs.getDomainQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_DOMAIN_QUERY,
});
stubs.getTimebasedQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_QUERY,
});
stubs.getTimebasedSubscriptionHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
});
stubs.getResponseHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_RESPONSE,
});
stubs.getDomainDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_DOMAIN_DATA,
});
stubs.getTimebasedArchiveDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA,
});
stubs.getTimebasedPubSubDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA,
});
stubs.getSessionQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_SESSION_QUERY,
});
stubs.getSessionDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_SESSION_DATA,
});

stubs.getDomainQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  stubs.getDomainQueryHeader()
);
stubs.getTimebasedQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  stubs.getTimebasedQueryHeader()
);
stubs.getTimebasedSubscriptionHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  stubs.getTimebasedSubscriptionHeader()
);
stubs.getResponseHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  stubs.getResponseHeader()
);
stubs.getDomainDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  stubs.getDomainDataHeader()
);
stubs.getTimebasedArchiveDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  stubs.getTimebasedArchiveDataHeader()
);
stubs.getTimebasedPubSubDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  stubs.getTimebasedPubSubDataHeader()
);
stubs.getSessionDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  stubs.getSessionDataHeader()
);

// QueryArguments
stubs.getQueryArguments = override => applyOverride({
  /* sortFieldName: 'groundDate',
  sortOrder: globalConstants.SORTORDER_ASC,
  limitStart: 0,
  limitNumber: 1e9,
  getLastType: globalConstants.GETLASTTYPE_GET_N_LAST,
  getLastFromTime: stubs.getTimestamp(),
  getLastNumber: 42,*/
  filters: [
    stubs.getFilter(),
    stubs.getFilter({
      fieldName: 'groundDate',
      type: globalConstants.FILTERTYPE_LT,
      fieldValue: 42,
    }),
  ],
}, override);

stubs.getQueryArgumentsProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.QueryArguments',
  stubs.getQueryArguments(override)
);

// Session
stubs.getSession = override => applyOverride({
  name: 'Master',
  id: 0,
  timestamp: stubs.getTimestamp(),
  delta: 0,
}, override);

stubs.getSessionProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Session',
  stubs.getSession(override)
);

// Sessions
stubs.getSessions = override => applyOverride({
  sessions: [
    stubs.getSession(),
    stubs.getSession({ name: 'Session#42', id: 42, delta: 42 }),
  ],
}, override);

stubs.getSessionsProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Sessions',
  stubs.getSession(override)
);

// Status
stubs.getSuccessStatus = () => ({
  status: globalConstants.STATUS_SUCCESS,
});
stubs.getErrorStatus = () => ({
  status: globalConstants.STATUS_ERROR,
});

stubs.getSuccessStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Status',
  stubs.getSuccessStatus()
);
stubs.getErrorStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Status',
  stubs.getErrorStatus()
);

// String
stubs.getString = (string = 'defaultString') => ({
  string,
});
stubs.getStringProtobuf = string => protobuf.encode(
  'dc.dataControllerUtils.String',
  stubs.getString(string)
);

// TimeInterval
stubs.getTimeInterval = override => applyOverride({
  startTime: stubs.getTimestamp({ ms: now - 10000 }), // 10s
  endTime: stubs.getTimestamp(),
}, override);

stubs.getTimeIntervalProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.TimeInterval',
  stubs.getTimeInterval(override)
);

// Timestamp
stubs.getTimestamp = override => applyOverride({
  ms: now,
}, override);

stubs.getTimestampProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Timestamp',
  stubs.getTimestamp(override)
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
