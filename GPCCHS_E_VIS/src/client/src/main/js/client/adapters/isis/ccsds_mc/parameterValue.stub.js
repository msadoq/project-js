// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');


const parameterValue = {
  convertedValue: _random(1, 100, true),
  extractedValue: _random(1, 100, true),
  rawValue: _random(1, 100, true),
  isObsolete: true,
  triggerOnCounter: 10,
  triggerOffCounter: 10,
  monitoringState: 'mySTRING',
  validityState: 0,
};

module.exports = override => (override ? _defaultsDeep({}, override, parameterValue) : parameterValue);
