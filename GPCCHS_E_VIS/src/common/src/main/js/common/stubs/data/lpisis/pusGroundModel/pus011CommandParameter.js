// Generated file
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');


module.exports = override => applyOverride({
  parameterName: 'mySTRING',
  parameterValue: _random(1, 100, true),
}, override);

