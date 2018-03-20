// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Pus011EncapsulatingTc = require('./pus011EncapsulatingTc');
const Pus003HkPacket = require('./pus003HkPacket');
const Pus013Ldt = require('./pus013Ldt');
const Pus014Model = require('./pus014Model');
const Pus003DiagnosticPacket = require('./pus003DiagnosticPacket');
const Pus018Model = require('./pus018Model');
const Pus014HkOrDiagPacket = require('./pus014HkOrDiagPacket');
const PusValue = require('./pusValue');
const Pus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const Pus011SubSchedule = require('./pus011SubSchedule');
const Pus003Packet = require('./pus003Packet');
const Pus019EventAction = require('./pus019EventAction');
const Pus144Model = require('./pus144Model');
const Pus013DownlinkLdt = require('./pus013DownlinkLdt');
const Pus018ConfiguredObcp = require('./pus018ConfiguredObcp');
const Pus142FunctionalMonitoring = require('./pus142FunctionalMonitoring');
const PusElement = require('./pusElement');
const Pus142Model = require('./pus142Model');
const Pus014ForwardedPacket = require('./pus014ForwardedPacket');
const Pus005Model = require('./pus005Model');
const Pus011Model = require('./pus011Model');
const Pus015Packet = require('./pus015Packet');
const Pus015PacketStore = require('./pus015PacketStore');
const Pus005OnBoardEvent = require('./pus005OnBoardEvent');
const Pus013Model = require('./pus013Model');
const Pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const Pus003Model = require('./pus003Model');
const PusParameter = require('./pusParameter');
const Pus011CommandParameter = require('./pus011CommandParameter');
const Pus144OnboardFiles = require('./pus144OnboardFiles');
const Pus014EventReportPacket = require('./pus014EventReportPacket');
const Pus011SyncPoint = require('./pus011SyncPoint');
const Pus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const Pus140Parameter = require('./pus140Parameter');
const PusElementList = require('./pusElementList');
const Pus011Apid = require('./pus011Apid');
const GroundModel = require('./groundModel');
const Pus013LdtPart = require('./pus013LdtPart');
const Pus140Model = require('./pus140Model');
const Pus019Model = require('./pus019Model');
const Pus018Obcp = require('./pus018Obcp');
const Pus013UplinkLdt = require('./pus013UplinkLdt');
const Pus011Command = require('./pus011Command');
const Pus012Model = require('./pus012Model');
const Pus015Model = require('./pus015Model');
const Pus011TimeShift = require('./pus011TimeShift');
const Pus014TmPacket = require('./pus014TmPacket');
const Apid = require('./apid');

module.exports = {
  Pus011EncapsulatingTc: { type: 'protobuf', adapter: Pus011EncapsulatingTc },
  Pus003HkPacket: { type: 'protobuf', adapter: Pus003HkPacket },
  Pus013Ldt: { type: 'protobuf', adapter: Pus013Ldt },
  Pus014Model: { type: 'protobuf', adapter: Pus014Model },
  Pus003DiagnosticPacket: { type: 'protobuf', adapter: Pus003DiagnosticPacket },
  Pus018Model: { type: 'protobuf', adapter: Pus018Model },
  Pus014HkOrDiagPacket: { type: 'protobuf', adapter: Pus014HkOrDiagPacket },
  PusValue: { type: 'protobuf', adapter: PusValue },
  Pus012ParameterMonitoringDefinition: { type: 'protobuf', adapter: Pus012ParameterMonitoringDefinition },
  Pus011SubSchedule: { type: 'protobuf', adapter: Pus011SubSchedule },
  Pus003Packet: { type: 'protobuf', adapter: Pus003Packet },
  Pus019EventAction: { type: 'protobuf', adapter: Pus019EventAction },
  Pus144Model: { type: 'protobuf', adapter: Pus144Model },
  Pus013DownlinkLdt: { type: 'protobuf', adapter: Pus013DownlinkLdt },
  Pus018ConfiguredObcp: { type: 'protobuf', adapter: Pus018ConfiguredObcp },
  Pus142FunctionalMonitoring: { type: 'protobuf', adapter: Pus142FunctionalMonitoring },
  PusElement: { type: 'protobuf', adapter: PusElement },
  Pus142Model: { type: 'protobuf', adapter: Pus142Model },
  Pus014ForwardedPacket: { type: 'protobuf', adapter: Pus014ForwardedPacket },
  Pus005Model: { type: 'protobuf', adapter: Pus005Model },
  Pus011Model: { type: 'protobuf', adapter: Pus011Model },
  Pus015Packet: { type: 'protobuf', adapter: Pus015Packet },
  Pus015PacketStore: { type: 'protobuf', adapter: Pus015PacketStore },
  Pus005OnBoardEvent: { type: 'protobuf', adapter: Pus005OnBoardEvent },
  Pus013Model: { type: 'protobuf', adapter: Pus013Model },
  Pus012MonitoringCheckProperties: { type: 'protobuf', adapter: Pus012MonitoringCheckProperties },
  Pus003Model: { type: 'protobuf', adapter: Pus003Model },
  PusParameter: { type: 'protobuf', adapter: PusParameter },
  Pus011CommandParameter: { type: 'protobuf', adapter: Pus011CommandParameter },
  Pus144OnboardFiles: { type: 'protobuf', adapter: Pus144OnboardFiles },
  Pus014EventReportPacket: { type: 'protobuf', adapter: Pus014EventReportPacket },
  Pus011SyncPoint: { type: 'protobuf', adapter: Pus011SyncPoint },
  Pus142ParameterMonitoringDefinition: { type: 'protobuf', adapter: Pus142ParameterMonitoringDefinition },
  Pus140Parameter: { type: 'protobuf', adapter: Pus140Parameter },
  PusElementList: { type: 'protobuf', adapter: PusElementList },
  Pus011Apid: { type: 'protobuf', adapter: Pus011Apid },
  GroundModel: { type: 'raw', adapter: GroundModel },
  Pus013LdtPart: { type: 'protobuf', adapter: Pus013LdtPart },
  Pus140Model: { type: 'protobuf', adapter: Pus140Model },
  Pus019Model: { type: 'protobuf', adapter: Pus019Model },
  Pus018Obcp: { type: 'protobuf', adapter: Pus018Obcp },
  Pus013UplinkLdt: { type: 'protobuf', adapter: Pus013UplinkLdt },
  Pus011Command: { type: 'protobuf', adapter: Pus011Command },
  Pus012Model: { type: 'protobuf', adapter: Pus012Model },
  Pus015Model: { type: 'protobuf', adapter: Pus015Model },
  Pus011TimeShift: { type: 'protobuf', adapter: Pus011TimeShift },
  Pus014TmPacket: { type: 'protobuf', adapter: Pus014TmPacket },
  Apid: { type: 'raw', adapter: Apid },
};
