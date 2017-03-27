// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getUCPParameter = require('./uCPParameter');

const now = _now();

module.exports = override => applyOverride({
  date: now,
  parameters: [getUCPParameter(), getUCPParameter()],
}, override);

