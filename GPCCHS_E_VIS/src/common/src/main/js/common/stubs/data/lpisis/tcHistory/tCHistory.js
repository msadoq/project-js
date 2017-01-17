// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getExpectedAck = require('./expectedAck');
const getSuccessiveAck = require('./successiveAck');

const now = _now();

module.exports = override => applyOverride({
  sendingDate: now,
  tcInProgress: true,
  tcId: -100,
  tcSourceId: 100,
  historyName: 'mySTRING',
  sendType: 0,
  tcNums: 100,
  expectedAck: getExpectedAck(),
  successiveAck: getSuccessiveAck(),
}, override);

