// Generated file
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');
const getObjectId = require('../ccsds_com/objectId');

module.exports = override => applyOverride({
  definition: getObjectId(),
  extractedValue: _random(1, 100, true),
  rawValue: _random(1, 100, true),
  convertedValue: _random(1, 100, true),
  triggerCounter: 10,
  monitoringState: 'mySTRING',
  validityState: 0,
}, override);

