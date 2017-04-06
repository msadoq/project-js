// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getPus013Ldt = require('./pus013Ldt');

module.exports = override => applyOverride({
  ackTimerArmed: true,
  ackTimerDeadline: -1000,
  pus013Ldt: getPus013Ldt(),
}, override);

