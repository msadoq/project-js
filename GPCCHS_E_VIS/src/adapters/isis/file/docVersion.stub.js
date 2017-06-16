// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _random = require('lodash/random');
const applyOverride = require('../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue.stub');

module.exports = override => applyOverride({
  externalVersion: 'mySTRING',
  internalVersion: 10,
  properties: [getNamedValue(), getNamedValue()],
  content: _random(1, 100, true),
}, override);
