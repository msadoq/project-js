// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _random = require('lodash/random');
const _now = require('lodash/now');
const applyOverride = require('../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  name: 'mySTRING',
  timestamp: now + 1,
  value: _random(1, 100, true),
}, override);
