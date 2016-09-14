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
  monitoringState: 'INFORMATIONAL',
  validityState: 'INVALID',
  isObsolete: false,
  isNominal: false,
}, override);

stubs.getReportingParameterProtobuf = override => protobuf.encode(
  'lpisis.decommutedParameter.ReportingParameter',
  stubs.getReportingParameter(override)
);

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

stubs.getDataQuery = override => applyOverride({
  id: 'my_unique_id',
  dataId: stubs.getDataId(),
  interval: {
    lowerTs: { ms: now - 10000 }, // 10s
    upperTs: { ms: now },
  },
}, override);

stubs.getDataQueryProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataQuery',
  stubs.getDataQuery(override)
);

stubs.getDcResponse = override => applyOverride({
  id: 'my_unique_id',
  status: 'ERROR',
  reason: 'My reason',
}, override);

stubs.getDcResponseProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DcResponse',
  stubs.getDcResponse(override)
);

stubs.getDataSubscribe = override => applyOverride({
  action: 'ADD',
  id: 'my_unique_id',
  dataId: stubs.getDataId(),
}, override);

stubs.getDataSubscribeProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataSubscribe',
  stubs.getDataSubscribe(override)
);

stubs.getNewDataMessage = override => applyOverride({
  dataId: stubs.getDataId(),
  id: 'test',
  dataSource : 'ARCHIVE',
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

stubs.getNewDataMessageProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.NewDataMessage',
  stubs.getNewDataMessage(override)
);


stubs.getDomainQuery = override => applyOverride({
  id : "myQueryId"
});

stubs.getDomainQueryProtobuf = override =>  protobuf.encode(
  'dc.dataControllerUtils.DomainQuery',
  stubs.getDomainQuery(override)
);

stubs.getDomainResponse = override => applyOverride({
  id : "myQueryId",
  domains : [
    {
      itemNamespace : 'domainsNamespace',
      name : 'fr.cnes.sat1.iongun',
      oid : '0051525005151000565215601510515',
      domainId : 98,
      parentDomainId : 42
    },
    {
      itemNamespace : 'domainsNamespace',
      name : 'fr.cnes.sat1',
      oid : '0051525005151000565215465660515',
      domainId : 27,
      parentDomainId : 98
    }]
});

stubs.getDomainResponseProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DomainResponse',
  stubs.getDomainResponse(override)
);



// SERVER MESSAGES (DcServerMessage)
stubs.getWrappedNewDataMessage = override => applyOverride({
  messageType : 'NEW_DATA_MESSAGE',
  payload : stubs.getNewDataMessageProtobuf(override)
}, override);

stubs.getWrappedDcResponse = override => applyOverride({
  messageType : 'DC_RESPONSE',
  payload : stubs.getDcResponseProtobuf(override)
}, override);

stubs.getWrappedDomainResponse = override => applyOverride({
  messageType : 'DOMAIN_RESPONSE',
  payload : stubs.getDomainResponseProtobuf(override)
}, override);

// CLIENT MESSAGES (DcClientMessage)
stubs.getWrappedDataQuery = override => applyOverride({
    messageType : 'DATA_QUERY',
    payload : stubs.getDataQueryProtobuf(override)
}, override);

stubs.getWrappedDataSubscribe = override => applyOverride({
    messageType : 'DATA_SUBSCRIBE',
    payload : stubs.getDataSubscribeProtobuf(override)
}, override);

stubs.getWrappedDomainQuery = override => applyOverride({
    messageType : 'DOMAIN_QUERY',
    payload : stubs.getDomainQueryProtobuf(override)
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

// const parseDataFullName = require('./parseDataFullName');
// const constants = require('../constants');
// stubs.getSubscription = override => {
//   let subscription = {
//     dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//     catalog: 'Reporting',
//     parameter: 'ATT_BC_STR1VOLTAGE',
//     type: 'ReportingParameter',
//     field: 'rawValue',
//     domainId: 0,
//     timeLineType: constants.TIMELINETYPE_SESSION,
//     sessionId: 100,
//     setFileName: '',
//     subscriptionState: constants.SUBSCRIPTIONSTATE_PLAY,
//     visuSpeed: 0,
//     visuWindow: {
//       lower: now - (3600 * 1000),
//       upper: now + (3600 * 1000),
//     },
//     filter: [],
//   };
//
//   if (override) {
//     _.forEach(override, (value, key) => {
//       // remove this key
//       if (typeof value === 'undefined') {
//         subscription = _.omit(subscription, [key]);
//         return;
//       }
//
//       // dataFullName
//       if (key === 'dataFullName') {
//         const parsed = parseDataFullName(value);
//         Object.assign(subscription, {
//           dataFullName: parsed.dataFullName,
//           catalog: parsed.catalog,
//           parameter: parsed.parameter,
//           type: parsed.type,
//         });
//         return;
//       }
//
//       // override key value
//       subscription[key] = value;
//     });
//   }
//
//   return subscription;
// };
