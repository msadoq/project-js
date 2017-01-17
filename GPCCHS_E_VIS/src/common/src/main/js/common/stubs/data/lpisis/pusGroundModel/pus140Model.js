// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus140Parameter = require('./pus140Parameter');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  pus140Parameter: [getPus140Parameter(), getPus140Parameter()],
  groundDate: now,
  apid: 100,
  noOfParameters: 100,
  pusElement: getPusElement(),
}, override);

