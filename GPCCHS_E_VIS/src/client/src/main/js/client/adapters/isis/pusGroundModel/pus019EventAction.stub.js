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

const pus019EventAction = {
  apid: 100,
  rid: 100,
  actionStatus: 100,
  actionTcPacketHeader: Buffer.alloc(4, 1),
  pusElement: getPusElement(),
  ridLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus019EventAction) : pus019EventAction);
