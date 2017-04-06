// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus013Ldt = require('./pus013Ldt');

const now = _now();

module.exports = override => applyOverride({
  receptionTimerArmed: true,
  receptionTimerDeadline: now,
  groundDate: -1000,
  pus013Ldt: getPus013Ldt(),
}, override);

