// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _random = require('lodash/random');
const _now = require('lodash/now');
const applyOverride = require('../../../protobuf/utils/applyOverride');


const now = _now();

module.exports = override => applyOverride({
  startTime: now,
  endTime: now,
  valueTime: now,
  value: _random(1, 100, true),
  sampleCount: 100,
  timestamp: now,
}, override);
