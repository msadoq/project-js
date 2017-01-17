// Generated file
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');
const getPusParameter = require('./pusParameter');

module.exports = override => applyOverride({
  id: 100,
  status: 100,
  stepId: 100,
  partitionId: 100,
  observabilityLevel: 100,
  priority: 100,
  pus18Parameter: [getPusParameter(), getPusParameter()],
  pusElement: getPusElement(),
}, override);

