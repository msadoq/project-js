// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getAck = require('./ack.stub');

const now = _now();

module.exports = override => applyOverride({
  ackRequestDate: now,
  systemDate: now,
  ack: getAck(),
  comment: 'mySTRING',
}, override);
