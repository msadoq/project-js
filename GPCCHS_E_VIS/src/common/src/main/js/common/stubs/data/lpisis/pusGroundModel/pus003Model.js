// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus003DiagnosticPacket = require('./pus003DiagnosticPacket');
const getPus003HkPacket = require('./pus003HkPacket');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  pus003DiagPacket: [getPus003DiagnosticPacket(), getPus003DiagnosticPacket()],
  numberHkPackets: 100,
  numberDiagPackets: 100,
  apid: 100,
  pus003HkPacket: [getPus003HkPacket(), getPus003HkPacket()],
  status: 100,
  groundDate: now,
  pusElement: getPusElement(),
}, override);

