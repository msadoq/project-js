// Generated file
const _random = require('lodash/random');
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  name: 'mySTRING',
  timestamp: now + 1,
  value: _random(1, 100, true),
}, override);

