// Produced by Acceleo JavaScript Generator 1.1.0
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  parameterId: 100,
  apid: 100,
  currentValue: _random(1, 100, true),
  pusElement: getPusElement(),
}, override);

