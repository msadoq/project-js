// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');
const getObjectId = require('../ccsds_com/objectId.stub');

const parameter = {
  definition: getObjectId(),
  extractedValue: _random(1, 100, true),
  rawValue: _random(1, 100, true),
  convertedValue: _random(1, 100, true),
  triggerCounter: 10,
  monitoringState: 'nominal',
  validityState: 0,
  isObsolete: false,
  isNominal: true,
};

module.exports = override => (override ? _defaultsDeep({}, override, parameter) : parameter);
