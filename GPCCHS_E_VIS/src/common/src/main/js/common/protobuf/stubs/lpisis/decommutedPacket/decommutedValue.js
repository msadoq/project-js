// Produced by Acceleo JavaScript Generator 1.1.0
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');


module.exports = override => applyOverride({
  name: 'myIDENTIFIER',
  extractedValue: _random(1, 100, true),
  rawValue: _random(1, 100, true),
  convertedValue: _random(1, 100, true),
  validityState: 0,
}, override);

