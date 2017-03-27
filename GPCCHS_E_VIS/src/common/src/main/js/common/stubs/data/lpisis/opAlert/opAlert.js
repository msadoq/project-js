// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue');
const getOpAlertClosingData = require('./opAlertClosingData');
const getOpAlertConfiguration = require('./opAlertConfiguration');

const now = _now();

module.exports = override => applyOverride({
  alertDate: now,
  specificAttributes: getNamedValue(),
  closingNeeded: true,
  answerID: 1000,
  systemDate: now,
  mission: 'mySTRING',
  satellite: 1000,
  opAlertConfiguration: [getOpAlertConfiguration(), getOpAlertConfiguration()],
  status: 0,
  lastCallDate: now,
  opAlertClosingData: getOpAlertClosingData(),
}, override);

