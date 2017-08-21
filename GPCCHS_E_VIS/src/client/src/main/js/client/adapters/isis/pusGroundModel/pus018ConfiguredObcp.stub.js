// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const pus018ConfiguredObcp = {
  id: 100,
  hkParamNameForName: 'mySTRING',
  hkParamNameForId: 'mySTRING',
  hkParamNameForStatus: 'mySTRING',
  hkParamNameForPriority: 'mySTRING',
  hkParamNameForStepId: 'mySTRING',
  status: 100,
  stepId: 100,
  priority: 100,
  pusElement: getPusElement(),
};

module.exports = override => (override ? _defaultsDeep({}, override, pus018ConfiguredObcp) : pus018ConfiguredObcp);
