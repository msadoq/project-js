// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getDecommutedValue = require('./decommutedValue');

const now = _now();

module.exports = override => applyOverride({
  onboardDate: now,
  groundDate: now,
  isNominal: true,
  decommutedValues: [getDecommutedValue(), getDecommutedValue()],
}, override);

