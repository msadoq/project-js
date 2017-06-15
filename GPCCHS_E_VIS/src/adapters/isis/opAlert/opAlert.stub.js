// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getOpAlertClosingData = require('./opAlertClosingData.stub');
const getOpAlertConfiguration = require('./opAlertConfiguration.stub');
const getUser = require('../ccsds_cs/user.stub');

const now = _now();

module.exports = override => applyOverride({
  alertDate: now,
  target: getUser(),
  specificAttributes: getNamedValue(),
  closingNeeded: true,
  callingUser: getUser(),
  systemDate: now,
  mission: 'mySTRING',
  satellite: 1000,
  opAlertConfiguration: [getOpAlertConfiguration(), getOpAlertConfiguration()],
  status: 0,
  lastCallDate: now,
  opAlertClosingData: getOpAlertClosingData(),
}, override);
