const {
  now: _now,
  defaultsDeep: _defaultsDeep,
  random: _random,
  sortBy: _sortBy,
  map: _map,
} = require('lodash');
const protobuf = require('../protobuf/index');
const constants = require('../constants');
// eslint-disable-next-line import/no-extraneous-dependencies
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

// ReportinParameter
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

/*
 * DC COMICS
 */

// Action
stubs.getAddAction = () => ({
  action: constants.SUBSCRIPTIONACTION_ADD,
});
stubs.getDeleteAction = () => ({
  action: constants.SUBSCRIPTIONACTION_DELETE,
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
  messageType: constants.MESSAGETYPE_DOMAIN_QUERY,
});
stubs.getTimebasedQueryHeader = () => ({
  messageType: constants.MESSAGETYPE_TIMEBASED_QUERY,
});
stubs.getTimebasedSubscriptionHeader = () => ({
  messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
});
stubs.getResponseHeader = () => ({
  messageType: constants.MESSAGETYPE_RESPONSE,
});
stubs.getDomainDataHeader = () => ({
  messageType: constants.MESSAGETYPE_DOMAIN_DATA,
});
stubs.getTimebasedArchiveDataHeader = () => ({
  messageType: constants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA,
});
stubs.getTimebasedPubSubDataHeader = () => ({
  messageType: constants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA,
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

// Status
stubs.getSuccessStatus = () => ({
  status: constants.STATUS_SUCCESS,
});
stubs.getErrorStatus = () => ({
  status: constants.STATUS_ERROR,
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
