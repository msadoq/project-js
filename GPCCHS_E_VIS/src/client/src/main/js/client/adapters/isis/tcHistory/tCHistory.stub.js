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
const getExpectedAck = require('./expectedAck.stub');
const getSuccessiveAck = require('./successiveAck.stub');

const now = _now();

const tCHistory = {
  sendingDate: now,
  tcInProgress: true,
  tcId: -100,
  tcSourceId: 100,
  historyName: 'mySTRING',
  sendType: 0,
  tcNums: 100,
  expectedAck: getExpectedAck(),
  successiveAck: getSuccessiveAck(),
};

module.exports = override => (override ? _defaultsDeep({}, override, tCHistory) : tCHistory);
