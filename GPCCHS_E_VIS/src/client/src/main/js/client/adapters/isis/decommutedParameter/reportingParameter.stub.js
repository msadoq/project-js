// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const reportingParameter = {
  onboardDate: now,
  groundDate: now,
  convertedValue: _random(1, 100, true),
  rawValue: _random(1, 100, true),
  extractedValue: _random(1, 100, true),
  monitoringState: 'mySTRING',
  triggerOnCounter: 10,
  triggerOffCounter: 10,
  validityState: 0,
  isObsolete: true,
  isNominal: true,
};

module.exports = override => (override ? _defaultsDeep({}, override, reportingParameter) : reportingParameter);
