// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getUCPParameter = require('./uCPParameter');

const now = _now();

module.exports = override => applyOverride({
  date: now,
  parameters: [getUCPParameter(), getUCPParameter()],
}, override);

