// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getTransition = require('./transition');

const now = _now();

module.exports = override => applyOverride({
  creationDate: now,
  paramUid: -1000,
  updateDate: now,
  closingDate: now,
  hasAckRequest: true,
  alarmId: -1000,
  transitions: [getTransition(), getTransition()],
  isNominal: true,
}, override);

