// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus014EventReportPacket = require('./pus014EventReportPacket.stub');
const getPus014HkOrDiagPacket = require('./pus014HkOrDiagPacket.stub');
const getPus014TmPacket = require('./pus014TmPacket.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus014Model = {
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
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus014Model) : pus014Model);
