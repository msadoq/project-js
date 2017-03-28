// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus014EventReportPacket = require('./pus014EventReportPacket');
const getPus014HkOrDiagPacket = require('./pus014HkOrDiagPacket');
const getPus014TmPacket = require('./pus014TmPacket');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  pus014EventReportPacket: [getPus014EventReportPacket(), getPus014EventReportPacket()],
  pus014HkPacket: [getPus014HkOrDiagPacket(), getPus014HkOrDiagPacket()],
  pus014TmPacket: [getPus014TmPacket(), getPus014TmPacket()],
  groundDate: now,
  apid: 100,
  pus014DiagPacket: [getPus014HkOrDiagPacket(), getPus014HkOrDiagPacket()],
  noEventReportPackets: 100,
  noDiagPackets: 100,
  noHKPackets: 100,
  noTMPackets: 100,
  pusElement: getPusElement(),
}, override);

