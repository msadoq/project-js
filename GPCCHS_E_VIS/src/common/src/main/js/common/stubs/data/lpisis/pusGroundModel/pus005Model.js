// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus005OnBoardEvent = require('./pus005OnBoardEvent');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  apid: 100,
  pus005OnBoardEvent: [getPus005OnBoardEvent(), getPus005OnBoardEvent()],
  groundDate: now,
  noMonitoringEvents: 100,
  noEventReports: 100,
  pusElement: getPusElement(),
}, override);

