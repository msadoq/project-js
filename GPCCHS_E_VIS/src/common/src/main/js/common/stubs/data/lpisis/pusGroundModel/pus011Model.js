// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  maxNoTc: 100,
  scheduleStatus: 100,
  apid: 100,
  noCommands: 100,
  noSubSchedule: 100,
  enabledApids: [100, 100],
  pusElement: getPusElement(),
  groundDate: now,
  disabledApids: [100, 100],
}, override);

