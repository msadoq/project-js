// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus142ParameterMonitoringDefinition = {
  paramMonId: 100,
  uniqueId: 1000,
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  lastUpdateModeId: 100,
  lastUpdateTimeId: 'mySTRING',
  paramMonName: 'mySTRING',
  fmonId: 100,
  fmonIdLabel: 'mySTRING',
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus142ParameterMonitoringDefinition) : pus142ParameterMonitoringDefinition);
