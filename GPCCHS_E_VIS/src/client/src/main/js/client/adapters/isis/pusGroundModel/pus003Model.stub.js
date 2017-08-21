// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus003DiagnosticPacket = require('./pus003DiagnosticPacket.stub');
const getPus003HkPacket = require('./pus003HkPacket.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus003Model = {
  pus003DiagPacket: [getPus003DiagnosticPacket(), getPus003DiagnosticPacket()],
  numberHkPackets: 100,
  numberDiagPackets: 100,
  apid: 100,
  pus003HkPacket: [getPus003HkPacket(), getPus003HkPacket()],
  status: 100,
  groundDate: now,
  pusElement: getPusElement(),
};

module.exports = override => (override ? _defaultsDeep({}, override, pus003Model) : pus003Model);
