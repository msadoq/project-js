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



module.exports = {
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
};
