// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus005OnBoardEvent = require('./pus005OnBoardEvent.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus005Model = {
  apid: 100,
  pus005OnBoardEvent: [getPus005OnBoardEvent(), getPus005OnBoardEvent()],
  groundDate: now,
  noMonitoringEvents: 100,
  noEventReports: 100,
  pusElement: getPusElement(),
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus005Model) : pus005Model);
