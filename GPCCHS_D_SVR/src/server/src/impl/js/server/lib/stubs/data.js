const _ = require('lodash');
const protobuf = require('../protobuf/index');
const constants = require('../constants');

const now = _.now();

function applyOverride(payload, override) {
  if (!override) {
    return payload;
  }

  return _.defaultsDeep({}, override, payload);
}

const stubs = module.exports = {};

/*
 * LPISIS
 */

// ReportinParameter
stubs.getReportingParameter = override => applyOverride({
  onboardDate: now,
  groundDate: now + 20,
  convertedValue: _.random(1, 100, true),
  rawValue: _.random(1, 100, true),
  extractedValue: _.random(1, 100, true),
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
  action: 0, // ADD
});
stubs.getDeleteAction = () => ({
  action: 1, // DELETE
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

// Filter
stubs.getFilter = override => applyOverride({
  fieldName: 'extractedValue',
  type: constants.FILTERTYPE_GT,
  fieldValue: 42,
}, override);

stubs.getFilterProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.Filter',
  stubs.getFilter(override)
);

// Header
stubs.getDomainQueryHeader = () => ({
  messageType: 0, // DOMAIN_QUERY
});
stubs.getTimebasedQueryHeader = () => ({
  messageType: 1, // TIMEBASED_QUERY
});
stubs.getTimebasedSubscriptionHeader = () => ({
  messageType: 2, // TIMEBASED_SUBSCRIPTION
});
stubs.getResponseHeader = () => ({
  messageType: 3, // RESPONSE
});
stubs.getDomainDataHeader = () => ({
  messageType: 4, // DOMAIN_DATA
});
stubs.getTimebasedArchiveDataHeader = () => ({
  messageType: 5, // TIMEBASED_ARCHIVE_DATA
});
stubs.getTimebasedPubSubDataHeader = () => ({
  messageType: 6, // TIMEBASED_PUBSUB_DATA
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
  /*sortFieldName: 'groundDate',
  sortOrder: constants.SORTORDER_ASC,
  limitStart: 0,
  limitNumber: 1e9,
  getLastType: constants.GETLASTTYPE_GET_N_LAST,
  getLastFromTime: stubs.getTimestamp(),
  getLastNumber: 42,*/
  filters: [
    stubs.getFilter(),
    stubs.getFilter({
      fieldName: 'groundDate',
      type: constants.FILTERTYPE_LT,
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
  status: 0, // SUCCESS
});
stubs.getErrorStatus = () => ({
  status: 1, // ERROR
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
  const flattenFilters = _.sortBy(_.map(filters,
    ({ field, operator, value }) => `${field}.${operator}.${value}`
  ), e => e);
  let remoteId = `${r.catalog}.${r.parameterName}<${r.comObject}>:${r.sessionId}:${r.domainId}`;
  if (flattenFilters) {
    remoteId += `:${flattenFilters.join(',')}`;
  }
  return remoteId;
};
