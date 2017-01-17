// Generated file
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue');

module.exports = override => applyOverride({
  externalVersion: 'mySTRING',
  internalVersion: 10,
  properties: [getNamedValue(), getNamedValue()],
  content: _random(1, 100, true),
}, override);

