// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const pus005OnBoardEvent = {
  reportId: 100,
  onBoardStatus: 100,
  alarmLevel: 'mySTRING',
  pusElement: getPusElement(),
  reportIdLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus005OnBoardEvent) : pus005OnBoardEvent);