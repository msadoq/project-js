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
const getTransition = require('./transition.stub');

const now = _now();

const groundMonitoringAlarm = {
  creationDate: now,
  paramUid: -1000,
  updateDate: now,
  closingDate: now,
  hasAckRequest: true,
  alarmId: -1000,
  transitions: [getTransition(), getTransition()],
  isNominal: true,
};

module.exports = override => (override ? _defaultsDeep({}, override, groundMonitoringAlarm) : groundMonitoringAlarm);
