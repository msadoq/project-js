// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getExpectedAck = require('./expectedAck.stub');
const getSuccessiveAck = require('./successiveAck.stub');

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
