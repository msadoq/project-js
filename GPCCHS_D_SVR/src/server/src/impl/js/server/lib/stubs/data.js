const _ = require('lodash');
const protobuf = require('../protobuf/index');

const now = _.now();

function applyOverride(payload, override) {
  if (!override) {
    return payload;
  }

  return _.defaultsDeep({}, override, payload);
}

const stubs = module.exports = {};

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

stubs.getDataFilter = override => applyOverride({
  lhs: 'extractedValue',
  comp: 'OP_GT',
  rhs: '42',
}, override);

stubs.getDataFilterProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataFilter',
  stubs.getDataFilter(override)
);


stubs.getDataId = override => applyOverride({
  parameterName: 'ATT_BC_STR1STRRFQ1',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: 100,
  domainId: 200,
}, override);

stubs.getFilter = override => applyOverride({
  field: 'groundDate',
  operator: 'OP_EQ',
  value: 42,
}, override);

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

stubs.getDataIdWithFilter = override => applyOverride({
  parameterName: 'ATT_BC_STR1STRRFQ1',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: 100,
  domainId: 200,
  dataFilter: [stubs.getDataFilter(), stubs.getDataFilter({ comp: 'OP_LT', rhs: '84' })],
}, override);

stubs.getDataIdWithFilterProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataId',
  stubs.getDataIdWithFilter(override)
);

stubs.getDataIdProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataId',
  stubs.getDataId(override)
);

stubs.getTimestamp = override => applyOverride({
  ms: now,
}, override);

stubs.getTimeInterval = override => applyOverride({
  lowerTs: stubs.getTimestamp({ ms: now - 10000 }), // 10s
  upperTs: stubs.getTimestamp(),
}, override);

stubs.getDataQuery = override => applyOverride({
  id: 'my_unique_id',
  dataId: stubs.getDataId(),
  interval: stubs.getTimeInterval(),
}, override);

stubs.getDataQueryProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataQuery',
  stubs.getDataQuery(override)
);

stubs.getDcResponse = override => applyOverride({
  id: 'my_unique_id',
  status: 1, // 'ERROR',
  reason: 'My reason',
}, override);

stubs.getDcResponseProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DcResponse',
  stubs.getDcResponse(override)
);

stubs.getDataSubscribe = override => applyOverride({
  action: 0, // 'ADD',
  id: 'my_unique_id',
  dataId: stubs.getDataId(),
}, override);

stubs.getDataSubscribeProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataSubscribe',
  stubs.getDataSubscribe(override)
);

stubs.getDataPayload = override => applyOverride({
  timestamp: stubs.getTimestamp(),
  payload: protobuf.encode(
    'lpisis.decommutedParameter.ReportingParameter',
    stubs.getReportingParameter()
  ),
}, override);

stubs.getNewDataMessage = override => applyOverride({
  dataId: stubs.getDataId(),
  id: 'test',
  dataSource: 2, // 'ARCHIVE',
  payloads: [
    stubs.getDataPayload(),
    stubs.getDataPayload({
      timestamp: { ms: now + 1 },
    }),
  ],
  isEndOfQuery: false,
}, override);

stubs.getNewDataMessageProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.NewDataMessage',
  stubs.getNewDataMessage(override)
);


stubs.getDomainQuery = override => applyOverride({
  id: 'myQueryId',
}, override);

stubs.getDomainQueryProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DomainQuery',
  stubs.getDomainQuery(override)
);

stubs.getDomain = override => applyOverride({
  itemNamespace: 'Domains',
  name: 'fr.cnes.sat1',
  oid: '0051525005151000565215465660515',
  domainId: 27,
  parentDomainId: 98,
}, override);

stubs.getDomainResponse = override => applyOverride({
  id: 'myQueryId',
  domains: [
    stubs.getDomain(),
    stubs.getDomain({
      name: 'fr.cnes.sat1.iongun',
      oid: '0051525005151000565215601510515',
      domainId: 98,
      parentDomainId: 42,
    }),
  ],
}, override);

stubs.getDomainResponseProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DomainResponse',
  override || stubs.getDomainResponse()
);


// SERVER MESSAGES (DcServerMessage)
stubs.getWrappedNewDataMessage = override => applyOverride({
  messageType: 1, // 'NEW_DATA_MESSAGE',
  payload: stubs.getNewDataMessageProtobuf(override),
}, override);

stubs.getWrappedDcResponse = override => applyOverride({
  messageType: 2, // 'DC_RESPONSE',
  payload: stubs.getDcResponseProtobuf(override),
}, override);

stubs.getWrappedDomainResponse = override => applyOverride({
  messageType: 3, // 'DOMAIN_RESPONSE',
  payload: stubs.getDomainResponseProtobuf(override),
}, override);

// CLIENT MESSAGES (DcClientMessage)
stubs.getWrappedDataQuery = override => applyOverride({
  messageType: 1, // 'DATA_QUERY',
  payload: stubs.getDataQueryProtobuf(override),
}, override);

stubs.getWrappedDataSubscribe = override => applyOverride({
  messageType: 2, // 'DATA_SUBSCRIBE',
  payload: stubs.getDataSubscribeProtobuf(override),
}, override);

stubs.getWrappedDomainQuery = override => applyOverride({
  messageType: 3, // 'DOMAIN_QUERY',
  payload: stubs.getDomainQueryProtobuf(override),
}, override);

// SERVER MESSAGES PROTOBUF (DcServerMessage)
stubs.getWrappedNewDataMessageProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DcServerMessage',
  stubs.getWrappedNewDataMessage(override)
);

stubs.getWrappedDcResponseProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DcServerMessage',
  stubs.getWrappedDcResponse(override)
);

stubs.getWrappedDomainResponseProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DcServerMessage',
  stubs.getWrappedDomainResponse(override)
);

stubs.getWrappedDataQueryProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DcClientMessage',
  stubs.getWrappedDataQuery(override)
);
stubs.getWrappedDataSubscribeProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DcClientMessage',
  stubs.getWrappedDataSubscribe(override)
);

stubs.getWrappedDomainQueryProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DcClientMessage',
  stubs.getWrappedDomainQuery(override)
);
