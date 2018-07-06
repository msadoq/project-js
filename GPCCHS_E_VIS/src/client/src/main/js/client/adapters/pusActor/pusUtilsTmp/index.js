const PusMmeModel = require('./pusMmeModel');
const PusMmePacket = require('./pusMmePacket');
const PusMmePacketParameter = require('./pusMmePacketParameter');
const PusMmePacketStore = require('./pusMmePacketStore');
const PusParameter = require('./pusParameter');
const PusServiceApid = require('./pusServiceApid');
const PusValue = require('./pusValue');
const ResetMessage = require('./resetMessage');
const SubscribeMessage = require('./subscribeMessage');
const SynchroniseMessage = require('./synchroniseMessage');
const UnsubscribeMessage = require('./unsubscribeMessage');
const CompareMessage = require('./compareMessage');
const HeaderMessage = require('./headerMessage');
const DataMessage = require('./dataMessage');
const InitialiseMessage = require('./initialiseMessage');
const Pus003DiagnosticPacket = require('./pus003DiagnosticPacket');
const Pus003HkPacket = require('./pus003HkPacket');
const Pus003Model = require('./pus003Model');
const Pus003Packet = require('./pus003Packet');
const Pus005Model = require('./pus005Model');
const Pus005OnBoardEvent = require('./pus005OnBoardEvent');
const Pus011Apid = require('./pus011Apid');
const Pus011Command = require('./pus011Command');
const Pus011CommandParameter = require('./pus011CommandParameter');
const Pus011Model = require('./pus011Model');
const Pus011SubSchedule = require('./pus011SubSchedule');
const Pus011TimeShift = require('./pus011TimeShift');
const Pus012Model = require('./pus012Model');
const Pus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const Pus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const Pus013Ldt = require('./pus013Ldt');
const Pus013LdtPart = require('./pus013LdtPart');
const Pus013Model = require('./pus013Model');
const Pus014ForwardedPacket = require('./pus014ForwardedPacket');
const Pus014Model = require('./pus014Model');
const Pus015Model = require('./pus015Model');
const Pus015Packet = require('./pus015Packet');
const Pus015PacketStore = require('./pus015PacketStore');
const Pus018Model = require('./pus018Model');
const Pus018Obcp = require('./pus018Obcp');

module.exports = {
  PusMmeModel: { type: 'protobuf', adapter: PusMmeModel},
  PusMmePacket: { type: 'protobuf', adapter: PusMmePacket},
  PusMmePacketParameter: { type: 'protobuf', adapter: PusMmePacketParameter},
  PusMmePacketStore: { type: 'protobuf', adapter: PusMmePacketStore},
  PusParameter: { type: 'protobuf', adapter: PusParameter},
  PusServiceApid: { type: 'protobuf', adapter: PusServiceApid},
  PusValue: { type: 'protobuf', adapter: PusValue},
  ResetMessage: { type: 'protobuf', adapter: ResetMessage},
  SubscribeMessage: { type: 'protobuf', adapter: SubscribeMessage},
  SynchroniseMessage: { type: 'protobuf', adapter: SynchroniseMessage },
  UnsubscribeMessage: {type : 'protobuf', adapter : UnsubscribeMessage},
  CompareMessage: { type: 'protobuf', adapter: CompareMessage },
  HeaderMessage: { type: 'protobuf', adapter: HeaderMessage },
  DataMessage: { type: 'protobuf', adapter: DataMessage },
  InitialiseMessage: { type: 'protobuf', adapter: InitialiseMessage },
  Pus003DiagnosticPacket: { type: 'protobuf', adapter: Pus003DiagnosticPacket },
  Pus003HkPacket: { type: 'protobuf', adapter: Pus003HkPacket },
  Pus003Model: { type: 'protobuf', adapter: Pus003Model },
  Pus003Packet: { type: 'protobuf', adapter: Pus003Packet },
  Pus005Model: { type: 'protobuf', adapter: Pus005Model },
  Pus005OnBoardEvent: { type: 'protobuf', adapter: Pus005OnBoardEvent },
  Pus011Apid: { type: 'protobuf', adapter: Pus011Apid },
  Pus011Command: { type: 'protobuf', adapter: Pus011Command },
  Pus011CommandParameter: { type: 'protobuf', adapter: Pus011CommandParameter },
  Pus011Model: { type: 'protobuf', adapter: Pus011Model },
  Pus011SubSchedule: { type: 'protobuf', adapter: Pus011SubSchedule },
  Pus011TimeShift: { type: 'protobuf', adapter: Pus011TimeShift },
  Pus012Model: { type: 'protobuf', adapter: Pus012Model },
  Pus012MonitoringCheckProperties: { type: 'protobuf', adapter: Pus012MonitoringCheckProperties },
  Pus012ParameterMonitoringDefinition: { type: 'protobuf', adapter: Pus012ParameterMonitoringDefinition },
  Pus013Ldt: { type: 'protobuf', adapter: Pus013Ldt },
  Pus013LdtPart: { type: 'protobuf', adapter: Pus013LdtPart },
  Pus013Model: { type: 'protobuf', adapter: Pus013Model },
  Pus014ForwardedPacket: { type: 'protobuf', adapter: Pus014ForwardedPacket },
  Pus014Model: { type: 'protobuf', adapter: Pus014Model },
  Pus015Model: { type: 'protobuf', adapter: Pus015Model },
  Pus015Packet: { type: 'protobuf', adapter: Pus015Packet },
  Pus015PacketStore: { type: 'protobuf', adapter: Pus015PacketStore },
  Pus018Model: { type: 'protobuf', adapter: Pus018Model },
  Pus018Obcp: { type: 'protobuf', adapter: Pus018Obcp },
};
