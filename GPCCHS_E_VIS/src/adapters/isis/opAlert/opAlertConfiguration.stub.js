// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const opAlertConfiguration = {
  numberCalls: -100,
  alertByPHONE: true,
  alertByAUDIO: true,
  alertByEMAIL: true,
  alertBySMS: true,
  maxNumberRetries: -100,
  delayRetries: 42.5,
};

module.exports = override => (override ? _defaultsDeep({}, override, opAlertConfiguration) : opAlertConfiguration);
