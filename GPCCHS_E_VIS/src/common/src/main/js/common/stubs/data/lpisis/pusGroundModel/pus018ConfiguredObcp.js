// Generated file
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
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
}, override);

