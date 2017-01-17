// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus013DownlinkLdt = require('./pus013DownlinkLdt');
const getPus013UplinkLdt = require('./pus013UplinkLdt');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  noOnGoingDownlinkLDTPacket: 100,
  pUS013UplinkLdt: [getPus013UplinkLdt(), getPus013UplinkLdt()],
  pUS013DownlinkLdt: [getPus013DownlinkLdt(), getPus013DownlinkLdt()],
  groundDate: now,
  apid: 100,
  noOnGoingUplinkLDT: 100,
  noOnGoingDownlinkLDTFile: 100,
  currentUplinkLduIdPosition: 100,
  pusElement: getPusElement(),
}, override);

