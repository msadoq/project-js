// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus019EventAction = require('./pus019EventAction');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  serviceStatus: 100,
  noOfEventActions: 100,
  pus19EventAction: [getPus019EventAction(), getPus019EventAction()],
  groundDate: now,
  apid: 100,
  pusElement: getPusElement(),
}, override);

