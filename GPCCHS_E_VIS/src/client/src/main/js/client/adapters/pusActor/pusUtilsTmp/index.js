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



module.exports = {
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
};
