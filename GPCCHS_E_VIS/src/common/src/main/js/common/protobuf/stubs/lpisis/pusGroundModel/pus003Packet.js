// Produced by Acceleo JavaScript Generator 1.1.0
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  sid: 100,
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  validityParameterExpectedValue: _random(1, 100, true),
  collectionInterval: 4242,
  status: 100,
  pusElement: getPusElement(),
}, override);

