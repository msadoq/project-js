// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Pus014Model = require('./pus014Model');
const Pus014TmPacket = require('./pus014TmPacket');
const PusParameter = require('./pusParameter');
const Pus014HkOrDiagPacket = require('./pus014HkOrDiagPacket');
const Pus013UplinkLdt = require('./pus013UplinkLdt');
const Pus019Model = require('./pus019Model');
const Pus144OnboardFiles = require('./pus144OnboardFiles');
const Pus018Model = require('./pus018Model');
const Pus018ConfiguredObcp = require('./pus018ConfiguredObcp');
const Pus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const PusElementList = require('./pusElementList');
const Pus015Model = require('./pus015Model');
const GroundModel = require('./groundModel');
const Pus011TimeShift = require('./pus011TimeShift');
const Pus011Apid = require('./pus011Apid');
const Pus003HkPacket = require('./pus003HkPacket');
const Pus015Packet = require('./pus015Packet');
const Pus140Parameter = require('./pus140Parameter');
const Pus011Model = require('./pus011Model');
const Pus013Ldt = require('./pus013Ldt');
const Pus005OnBoardEvent = require('./pus005OnBoardEvent');
const Pus019EventAction = require('./pus019EventAction');
const Pus011EncapsulatingTc = require('./pus011EncapsulatingTc');
const Pus012Model = require('./pus012Model');
const Pus144Model = require('./pus144Model');
const Pus005Model = require('./pus005Model');
const Pus013DownlinkLdt = require('./pus013DownlinkLdt');
const Pus011CommandParameter = require('./pus011CommandParameter');
const Pus011SubSchedule = require('./pus011SubSchedule');
const Pus014ForwardedPacket = require('./pus014ForwardedPacket');
const Pus011SyncPoint = require('./pus011SyncPoint');
const Pus003DiagnosticPacket = require('./pus003DiagnosticPacket');
const PusElement = require('./pusElement');
const Pus003Model = require('./pus003Model');
const Pus142FunctionalMonitoring = require('./pus142FunctionalMonitoring');
const Pus011Command = require('./pus011Command');
const Pus018Obcp = require('./pus018Obcp');
const Pus003Packet = require('./pus003Packet');
const Pus013Model = require('./pus013Model');
const PusValue = require('./pusValue');
const Pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const Pus014EventReportPacket = require('./pus014EventReportPacket');
const Pus142Model = require('./pus142Model');
const Pus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const Pus015PacketStore = require('./pus015PacketStore');
const Pus013LdtPart = require('./pus013LdtPart');
const Pus140Model = require('./pus140Model');
const Apid = require('./apid');

module.exports = {
  Pus014Model: { type: 'protobuf', adapter: Pus014Model },
  Pus014TmPacket: { type: 'protobuf', adapter: Pus014TmPacket },
  PusParameter: { type: 'protobuf', adapter: PusParameter },
  Pus014HkOrDiagPacket: { type: 'protobuf', adapter: Pus014HkOrDiagPacket },
  Pus013UplinkLdt: { type: 'protobuf', adapter: Pus013UplinkLdt },
  Pus019Model: { type: 'protobuf', adapter: Pus019Model },
  Pus144OnboardFiles: { type: 'protobuf', adapter: Pus144OnboardFiles },
  Pus018Model: { type: 'protobuf', adapter: Pus018Model },
  Pus018ConfiguredObcp: { type: 'protobuf', adapter: Pus018ConfiguredObcp },
  Pus012ParameterMonitoringDefinition: { type: 'protobuf', adapter: Pus012ParameterMonitoringDefinition },
  PusElementList: { type: 'protobuf', adapter: PusElementList },
  Pus015Model: { type: 'protobuf', adapter: Pus015Model },
  GroundModel: { type: 'raw', adapter: GroundModel },
  Pus011TimeShift: { type: 'protobuf', adapter: Pus011TimeShift },
  Pus011Apid: { type: 'protobuf', adapter: Pus011Apid },
  Pus003HkPacket: { type: 'protobuf', adapter: Pus003HkPacket },
  Pus015Packet: { type: 'protobuf', adapter: Pus015Packet },
  Pus140Parameter: { type: 'protobuf', adapter: Pus140Parameter },
  Pus011Model: { type: 'protobuf', adapter: Pus011Model },
  Pus013Ldt: { type: 'protobuf', adapter: Pus013Ldt },
  Pus005OnBoardEvent: { type: 'protobuf', adapter: Pus005OnBoardEvent },
  Pus019EventAction: { type: 'protobuf', adapter: Pus019EventAction },
  Pus011EncapsulatingTc: { type: 'protobuf', adapter: Pus011EncapsulatingTc },
  Pus012Model: { type: 'protobuf', adapter: Pus012Model },
  Pus144Model: { type: 'protobuf', adapter: Pus144Model },
  Pus005Model: { type: 'protobuf', adapter: Pus005Model },
  Pus013DownlinkLdt: { type: 'protobuf', adapter: Pus013DownlinkLdt },
  Pus011CommandParameter: { type: 'protobuf', adapter: Pus011CommandParameter },
  Pus011SubSchedule: { type: 'protobuf', adapter: Pus011SubSchedule },
  Pus014ForwardedPacket: { type: 'protobuf', adapter: Pus014ForwardedPacket },
  Pus011SyncPoint: { type: 'protobuf', adapter: Pus011SyncPoint },
  Pus003DiagnosticPacket: { type: 'protobuf', adapter: Pus003DiagnosticPacket },
  PusElement: { type: 'protobuf', adapter: PusElement },
  Pus003Model: { type: 'protobuf', adapter: Pus003Model },
  Pus142FunctionalMonitoring: { type: 'protobuf', adapter: Pus142FunctionalMonitoring },
  Pus011Command: { type: 'protobuf', adapter: Pus011Command },
  Pus018Obcp: { type: 'protobuf', adapter: Pus018Obcp },
  Pus003Packet: { type: 'protobuf', adapter: Pus003Packet },
  Pus013Model: { type: 'protobuf', adapter: Pus013Model },
  PusValue: { type: 'protobuf', adapter: PusValue },
  Pus012MonitoringCheckProperties: { type: 'protobuf', adapter: Pus012MonitoringCheckProperties },
  Pus014EventReportPacket: { type: 'protobuf', adapter: Pus014EventReportPacket },
  Pus142Model: { type: 'protobuf', adapter: Pus142Model },
  Pus142ParameterMonitoringDefinition: { type: 'protobuf', adapter: Pus142ParameterMonitoringDefinition },
  Pus015PacketStore: { type: 'protobuf', adapter: Pus015PacketStore },
  Pus013LdtPart: { type: 'protobuf', adapter: Pus013LdtPart },
  Pus140Model: { type: 'protobuf', adapter: Pus140Model },
  Apid: { type: 'raw', adapter: Apid },
};
