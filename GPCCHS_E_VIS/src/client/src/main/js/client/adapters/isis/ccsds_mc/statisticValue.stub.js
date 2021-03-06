// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const statisticValue = {
  startTime: now,
  endTime: now,
  valueTime: now,
  value: _random(1, 100, true),
  sampleCount: 100,
  timestamp: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, statisticValue) : statisticValue);
