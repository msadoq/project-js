// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus013DownlinkLdt = require('./pus013DownlinkLdt.stub');
const getPus013UplinkLdt = require('./pus013UplinkLdt.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus013Model = {
  noOnGoingDownlinkLDTPacket: 100,
  pUS013UplinkLdt: [getPus013UplinkLdt(), getPus013UplinkLdt()],
  pUS013DownlinkLdt: [getPus013DownlinkLdt(), getPus013DownlinkLdt()],
  groundDate: now,
  apid: 100,
  noOnGoingUplinkLDT: 100,
  noOnGoingDownlinkLDTFile: 100,
  currentUplinkLduIdPosition: 100,
  pusElement: getPusElement(),
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus013Model) : pus013Model);
