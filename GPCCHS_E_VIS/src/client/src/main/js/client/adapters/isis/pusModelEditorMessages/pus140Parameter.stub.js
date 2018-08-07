// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus140Parameter = {
  parameterId: 100,
  serviceApid: 100,
  currentValue: 'mySTRING',
  lastUpdateModeCurrentValue: 100,
  lastUpdateTimeCurrentValue: 'mySTRING',
  lastUpdateModeParamId: 100,
  lastUpdateTimeParamId: 'mySTRING',
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
  parameterName: 'mySTRING',
  initialValue: 'mySTRING',
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus140Parameter) : pus140Parameter);
