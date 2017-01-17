// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus142FunctionalMonitoring = require('./pus142FunctionalMonitoring');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  serviceStatus: 100,
  noOfFunctionalMonitoring: 100,
  pus142FunctionalMonitoring: [getPus142FunctionalMonitoring(), getPus142FunctionalMonitoring()],
  groundDate: now,
  apid: 100,
  pusElement: getPusElement(),
}, override);

