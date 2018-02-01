// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const PusValue = require('./pusValue');
const Pus011SyncPoint = require('./pus011SyncPoint');
const Pus015PacketStore = require('./pus015PacketStore');
const Pus011Command = require('./pus011Command');
const Pus003Model = require('./pus003Model');
const Pus142Model = require('./pus142Model');
const PusElement = require('./pusElement');
const Pus019EventAction = require('./pus019EventAction');
const Pus014Model = require('./pus014Model');
const PusElementList = require('./pusElementList');
const Pus011CommandParameter = require('./pus011CommandParameter');
const Pus013Ldt = require('./pus013Ldt');
const Pus011TimeShift = require('./pus011TimeShift');
const Pus018Model = require('./pus018Model');
const Pus003HkPacket = require('./pus003HkPacket');
const Pus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const Pus019Model = require('./pus019Model');
const Pus005Model = require('./pus005Model');
const Pus011Model = require('./pus011Model');
const Pus144Model = require('./pus144Model');
const Pus140Parameter = require('./pus140Parameter');
const Pus003Packet = require('./pus003Packet');
const Pus014ForwardedPacket = require('./pus014ForwardedPacket');
const Pus011Apid = require('./pus011Apid');
const GroundModel = require('./groundModel');
const Pus011EncapsulatingTc = require('./pus011EncapsulatingTc');
const Pus018Obcp = require('./pus018Obcp');
const Pus142FunctionalMonitoring = require('./pus142FunctionalMonitoring');
const PusParameter = require('./pusParameter');
const Pus015Packet = require('./pus015Packet');
const Pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const Pus140Model = require('./pus140Model');
const Pus013LdtPart = require('./pus013LdtPart');
const Pus013UplinkLdt = require('./pus013UplinkLdt');
const Pus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const Pus003DiagnosticPacket = require('./pus003DiagnosticPacket');
const Pus015Model = require('./pus015Model');
const Pus014EventReportPacket = require('./pus014EventReportPacket');
const Pus014TmPacket = require('./pus014TmPacket');
const Pus014HkOrDiagPacket = require('./pus014HkOrDiagPacket');
const Pus011SubSchedule = require('./pus011SubSchedule');
const Pus018ConfiguredObcp = require('./pus018ConfiguredObcp');
const Pus013Model = require('./pus013Model');
const Pus012Model = require('./pus012Model');
const Pus013DownlinkLdt = require('./pus013DownlinkLdt');
const Pus005OnBoardEvent = require('./pus005OnBoardEvent');
const Pus144OnboardFiles = require('./pus144OnboardFiles');

module.exports = {
  PusValue: { type: 'protobuf', adapter: PusValue },
  Pus011SyncPoint: { type: 'protobuf', adapter: Pus011SyncPoint },
  Pus015PacketStore: { type: 'protobuf', adapter: Pus015PacketStore },
  Pus011Command: { type: 'protobuf', adapter: Pus011Command },
  Pus003Model: { type: 'protobuf', adapter: Pus003Model },
  Pus142Model: { type: 'protobuf', adapter: Pus142Model },
  PusElement: { type: 'protobuf', adapter: PusElement },
  Pus019EventAction: { type: 'protobuf', adapter: Pus019EventAction },
  Pus014Model: { type: 'protobuf', adapter: Pus014Model },
  PusElementList: { type: 'protobuf', adapter: PusElementList },
  Pus011CommandParameter: { type: 'protobuf', adapter: Pus011CommandParameter },
  Pus013Ldt: { type: 'protobuf', adapter: Pus013Ldt },
  Pus011TimeShift: { type: 'protobuf', adapter: Pus011TimeShift },
  Pus018Model: { type: 'protobuf', adapter: Pus018Model },
  Pus003HkPacket: { type: 'protobuf', adapter: Pus003HkPacket },
  Pus142ParameterMonitoringDefinition: { type: 'protobuf', adapter: Pus142ParameterMonitoringDefinition },
  Pus019Model: { type: 'protobuf', adapter: Pus019Model },
  Pus005Model: { type: 'protobuf', adapter: Pus005Model },
  Pus011Model: { type: 'protobuf', adapter: Pus011Model },
  Pus144Model: { type: 'protobuf', adapter: Pus144Model },
  Pus140Parameter: { type: 'protobuf', adapter: Pus140Parameter },
  Pus003Packet: { type: 'protobuf', adapter: Pus003Packet },
  Pus014ForwardedPacket: { type: 'protobuf', adapter: Pus014ForwardedPacket },
  Pus011Apid: { type: 'protobuf', adapter: Pus011Apid },
  GroundModel: { type: 'raw', adapter: GroundModel },
  Pus011EncapsulatingTc: { type: 'protobuf', adapter: Pus011EncapsulatingTc },
  Pus018Obcp: { type: 'protobuf', adapter: Pus018Obcp },
  Pus142FunctionalMonitoring: { type: 'protobuf', adapter: Pus142FunctionalMonitoring },
  PusParameter: { type: 'protobuf', adapter: PusParameter },
  Pus015Packet: { type: 'protobuf', adapter: Pus015Packet },
  Pus012MonitoringCheckProperties: { type: 'protobuf', adapter: Pus012MonitoringCheckProperties },
  Pus140Model: { type: 'protobuf', adapter: Pus140Model },
  Pus013LdtPart: { type: 'protobuf', adapter: Pus013LdtPart },
  Pus013UplinkLdt: { type: 'protobuf', adapter: Pus013UplinkLdt },
  Pus012ParameterMonitoringDefinition: { type: 'protobuf', adapter: Pus012ParameterMonitoringDefinition },
  Pus003DiagnosticPacket: { type: 'protobuf', adapter: Pus003DiagnosticPacket },
  Pus015Model: { type: 'protobuf', adapter: Pus015Model },
  Pus014EventReportPacket: { type: 'protobuf', adapter: Pus014EventReportPacket },
  Pus014TmPacket: { type: 'protobuf', adapter: Pus014TmPacket },
  Pus014HkOrDiagPacket: { type: 'protobuf', adapter: Pus014HkOrDiagPacket },
  Pus011SubSchedule: { type: 'protobuf', adapter: Pus011SubSchedule },
  Pus018ConfiguredObcp: { type: 'protobuf', adapter: Pus018ConfiguredObcp },
  Pus013Model: { type: 'protobuf', adapter: Pus013Model },
  Pus012Model: { type: 'protobuf', adapter: Pus012Model },
  Pus013DownlinkLdt: { type: 'protobuf', adapter: Pus013DownlinkLdt },
  Pus005OnBoardEvent: { type: 'protobuf', adapter: Pus005OnBoardEvent },
  Pus144OnboardFiles: { type: 'protobuf', adapter: Pus144OnboardFiles },
};
