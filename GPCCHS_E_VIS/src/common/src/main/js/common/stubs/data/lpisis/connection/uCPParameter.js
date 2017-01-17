// Generated file
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');


module.exports = override => applyOverride({
  name: 'mySTRING',
  value: _random(1, 100, true),
}, override);

