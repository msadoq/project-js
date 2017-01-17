// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  ssId: 100,
  status: 100,
  executionTimeFirstTc: 1000,
  apid: 100,
  pusElement: getPusElement(),
  groundDate: now,
}, override);

