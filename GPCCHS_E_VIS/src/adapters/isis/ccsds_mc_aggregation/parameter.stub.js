// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _random = require('lodash/random');
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getObjectId = require('../ccsds_com/objectId.stub');

module.exports = override => applyOverride({
  definition: getObjectId(),
  extractedValue: _random(1, 100, true),
  rawValue: _random(1, 100, true),
  convertedValue: _random(1, 100, true),
  triggerCounter: 10,
  monitoringState: 'mySTRING',
  validityState: 0,
}, override);
