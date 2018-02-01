// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const pus015Packet = {
  apid: 100,
  serviceTpe: 100,
  serviceSubType: 100,
  sid: 100,
  subsamplingRatio: 100,
  pusElement: getPusElement(),
  packetType: 100,
  sidLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus015Packet) : pus015Packet);
