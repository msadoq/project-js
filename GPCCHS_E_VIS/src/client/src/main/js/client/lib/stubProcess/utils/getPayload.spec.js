import _each from 'lodash/each';

const getPayload = require('./getPayload');

const comObjects = {
  COP1Context: [
    { catalog: '', parameterName: '', comObject: 'COP1Context', shouldBe: true },
    { catalog: 'undefined', parameterName: '', comObject: 'COP1Context', shouldBe: true },
    { catalog: '', parameterName: 'undefined', comObject: 'COP1Context', shouldBe: true },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'COP1Context', shouldBe: true },
  ],
  decommutedPacket: [
    { catalog: '', parameterName: '', comObject: 'DecommutedPacket', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'DecommutedPacket', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'DecommutedPacket', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'DecommutedPacket', shouldBe: false },
    { catalog: 'TelemetryPacket', parameterName: '', comObject: 'DecommutedPacket', shouldBe: true },
    { catalog: 'TelemetryPacket', parameterName: 'undefined', comObject: 'DecommutedPacket', shouldBe: true },
  ],
  ClcwPacket: [
    { catalog: '', parameterName: '', comObject: 'ClcwPacket', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'ClcwPacket', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'ClcwPacket', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'ClcwPacket', shouldBe: false },
    { catalog: 'TelemetryPacket', parameterName: '', comObject: 'ClcwPacket', shouldBe: true },
    { catalog: 'TelemetryPacket', parameterName: 'undefined', comObject: 'ClcwPacket', shouldBe: true },
  ],
  IsisAggregation: [
    { catalog: '', parameterName: '', comObject: 'IsisAggregation', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'IsisAggregation', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'IsisAggregation', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'IsisAggregation', shouldBe: false },
    { catalog: 'TelemetryPacket', parameterName: '', comObject: 'IsisAggregation', shouldBe: true },
    { catalog: 'TelemetryPacket', parameterName: 'undefined', comObject: 'IsisAggregation', shouldBe: true },
  ],
  RmPacket: [
    { catalog: '', parameterName: '', comObject: 'RmPacket', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'RmPacket', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'RmPacket', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'RmPacket', shouldBe: false },
    { catalog: 'TelemetryPacket', parameterName: '', comObject: 'RmPacket', shouldBe: true },
    { catalog: 'TelemetryPacket', parameterName: 'undefined', comObject: 'RmPacket', shouldBe: true },
  ],
  TmPacket: [
    { catalog: '', parameterName: '', comObject: 'TmPacket', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'TmPacket', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'TmPacket', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'TmPacket', shouldBe: false },
    { catalog: 'TelemetryPacket', parameterName: '', comObject: 'TmPacket', shouldBe: true },
    { catalog: 'TelemetryPacket', parameterName: 'undefined', comObject: 'TmPacket', shouldBe: true },
  ],
  ReportingParameter: [
    { catalog: '', parameterName: '', comObject: 'ReportingParameter', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'ReportingParameter', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'ReportingParameter', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'ReportingParameter', shouldBe: false },
    { catalog: 'Reporting', parameterName: '', comObject: 'ReportingParameter', shouldBe: true },
    { catalog: 'Reporting', parameterName: 'undefined', comObject: 'ReportingParameter', shouldBe: true },
  ],
  GroundMonitoringAlarmAckRequest: [
    { catalog: '', parameterName: '', comObject: 'GroundMonitoringAlarmAckRequest', shouldBe: true },
    { catalog: 'undefined', parameterName: '', comObject: 'GroundMonitoringAlarmAckRequest', shouldBe: true },
    { catalog: '', parameterName: 'undefined', comObject: 'GroundMonitoringAlarmAckRequest', shouldBe: true },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'GroundMonitoringAlarmAckRequest', shouldBe: true },
  ],
  GroundMonitoringAlarm: [
    { catalog: '', parameterName: '', comObject: 'GroundMonitoringAlarm', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'GroundMonitoringAlarm', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'GroundMonitoringAlarm', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'GroundMonitoringAlarm', shouldBe: false },
    { catalog: 'Monitoring', parameterName: '', comObject: 'GroundMonitoringAlarm', shouldBe: true },
    { catalog: 'Monitoring', parameterName: 'undefined', comObject: 'GroundMonitoringAlarm', shouldBe: true },
  ],
  OnBoardAlarmAckRequest: [
    { catalog: '', parameterName: '', comObject: 'OnBoardAlarmAckRequest', shouldBe: true },
    { catalog: 'undefined', parameterName: '', comObject: 'OnBoardAlarmAckRequest', shouldBe: true },
    { catalog: '', parameterName: 'undefined', comObject: 'OnBoardAlarmAckRequest', shouldBe: true },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'OnBoardAlarmAckRequest', shouldBe: true },
  ],
  OperationParameter: [
    { catalog: '', parameterName: '', comObject: 'OperationParameter', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'OperationParameter', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'OperationParameter', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'OperationParameter', shouldBe: false },
    { catalog: 'OperationParameter', parameterName: '', comObject: 'OperationParameter', shouldBe: true },
    { catalog: 'OperationParameter', parameterName: 'undefined', comObject: 'OperationParameter', shouldBe: true },
  ],
  ComputedEvent: [
    { catalog: '', parameterName: '', comObject: 'ComputedEvent', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'ComputedEvent', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'ComputedEvent', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'ComputedEvent', shouldBe: false },
    { catalog: 'ComputedEventDefinition', parameterName: '', comObject: 'ComputedEvent', shouldBe: true },
    { catalog: 'ComputedEventDefinition', parameterName: 'undefined', comObject: 'ComputedEvent', shouldBe: true },
  ],
  LogbookEvent: [
    { catalog: '', parameterName: '', comObject: 'LogbookEvent', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'LogbookEvent', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'LogbookEvent', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'LogbookEvent', shouldBe: false },
    { catalog: 'LogbookEventDefinition', parameterName: '', comObject: 'LogbookEvent', shouldBe: true },
    { catalog: 'LogbookEventDefinition', parameterName: 'undefined', comObject: 'LogbookEvent', shouldBe: true },
  ],
  ExternalEvent: [
    { catalog: '', parameterName: '', comObject: 'ExternalEvent', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'ExternalEvent', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'ExternalEvent', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'ExternalEvent', shouldBe: false },
    { catalog: 'UserEventDefinition', parameterName: '', comObject: 'ExternalEvent', shouldBe: true },
    { catalog: 'UserEventDefinition', parameterName: 'undefined', comObject: 'ExternalEvent', shouldBe: true },
  ],
  UserEvent: [
    { catalog: '', parameterName: '', comObject: 'UserEvent', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'UserEvent', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'UserEvent', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'UserEvent', shouldBe: false },
    { catalog: 'UserEventDefinition', parameterName: '', comObject: 'UserEvent', shouldBe: true },
    { catalog: 'UserEventDefinition', parameterName: 'undefined', comObject: 'UserEvent', shouldBe: true },
  ],
  StatAggregation: [
    { catalog: '', parameterName: '', comObject: 'StatAggregation', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'StatAggregation', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'StatAggregation', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'StatAggregation', shouldBe: false },
    { catalog: 'StatAggregationDefinition', parameterName: '', comObject: 'StatAggregation', shouldBe: true },
    { catalog: 'StatAggregationDefinition', parameterName: 'undefined', comObject: 'StatAggregation', shouldBe: true },
  ],
  StatValue: [
    { catalog: '', parameterName: '', comObject: 'StatValue', shouldBe: false },
    { catalog: 'undefined', parameterName: '', comObject: 'StatValue', shouldBe: false },
    { catalog: '', parameterName: 'undefined', comObject: 'StatValue', shouldBe: false },
    { catalog: 'undefined', parameterName: 'undefined', comObject: 'StatValue', shouldBe: false },
    { catalog: 'StatValuesDefinition', parameterName: '', comObject: 'StatValue', shouldBe: true },
    { catalog: 'StatValuesDefinition', parameterName: 'undefined', comObject: 'StatValue', shouldBe: true },
  ],
};

const timestamp = 1518791878584;
jest.mock('../../utils/stubs', () => ({
  getStubData: () => ({
    getOnBoardAlarmAckRequestProtobuf: obj => obj,
    getGroundMonitoringAlarmAckRequestProtobuf: obj => obj,
    getReportingParameterProtobuf: obj => obj,
    getDecommutedPacketProtobuf: obj => obj,
    getDecommutedValue: obj => obj,
    getPus003ModelProtobuf: obj => obj,
    getPus005ModelProtobuf: obj => obj,
    getPus012ModelProtobuf: obj => obj,
    getOperationParameterProtobuf: obj => obj,
    getComputedEventProtobuf: obj => obj,
    getCOP1ContextProtobuf: obj => obj,
    getClcwPacketProtobuf: obj => obj,
    getIsisAggregationProtobuf: obj => obj,
    getRmPacketProtobuf: obj => obj,
    getTmPacketProtobuf: obj => obj,
    getGroundMonitoringAlarmProtobuf: obj => obj,
    getLogbookEventProtobuf: obj => obj,
    getExternalEventProtobuf: obj => obj,
    getUserEventProtobuf: obj => obj,
    getPus011CommandProtobuf: obj => obj,
    getPus011ModelProtobuf: obj => obj,
    getPus011SubScheduleProtobuf: obj => obj,
    getPus011SyncPointProtobuf: obj => obj,
    getPus013ModelProtobuf: obj => obj,
    getPus014ModelProtobuf: obj => obj,
    getPus015ModelProtobuf: obj => obj,
    getPus018ModelProtobuf: obj => obj,
    getPus019ModelProtobuf: obj => obj,
    getPus140ModelProtobuf: obj => obj,
    getPus142ModelProtobuf: obj => obj,
    getPus144ModelProtobuf: obj => obj,
    getStatisticValueProtobuf: obj => obj,
    getTimestampProtobuf: () => { Date.now(); },
  }),
}));

describe('getPayload', () => {
  _each(comObjects, (comObject, key) => {
    describe(`getPayload :: ${key}`, () => {
      _each(comObject, (t) => {
        test(`${t.catalog}.${t.parameterName}<${t.comObject}> should be ${t.shouldBe}`, () => {
          const payload = getPayload(timestamp, key, { epName: t.parameterName });
          expect(payload).toMatchSnapshot();
        });
      });
    });
  });
});
