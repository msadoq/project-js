// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getOpAlertClosingData = require('./opAlertClosingData.stub');
const getOpAlertConfiguration = require('./opAlertConfiguration.stub');

const now = _now();

const opAlert = {
  onCallOperator: 'mySTRING',
  specificAttributes: getNamedValue(),
  closingNeeded: true,
  alertConfiguration: getOpAlertConfiguration(),
  status: 0,
  lastCallDate: now,
  alertClosingData: getOpAlertClosingData(),
  numberCalls: -100,
  creationDate: now,
  satellite: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, opAlert) : opAlert);
