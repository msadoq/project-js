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
const getNamedValue = require('../ccsds_mal/namedValue.stub');

const docVersion = {
  externalVersion: 'mySTRING',
  internalVersion: 10,
  properties: [getNamedValue(), getNamedValue()],
  content: _random(1, 100, true),
};

module.exports = override => (override ? _defaultsDeep({}, override, docVersion) : docVersion);
