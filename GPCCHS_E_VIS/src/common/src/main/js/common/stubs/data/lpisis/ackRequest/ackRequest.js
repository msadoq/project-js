// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getAck = require('./ack');

const now = _now();

module.exports = override => applyOverride({
  ackRequestDate: now,
  systemDate: now,
  ack: getAck(),
  comment: 'mySTRING',
}, override);

