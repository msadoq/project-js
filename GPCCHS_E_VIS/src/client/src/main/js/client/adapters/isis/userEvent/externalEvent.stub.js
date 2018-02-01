// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getProvider = require('../ccsds_cs/provider.stub');

const now = _now();

const externalEvent = {
  eventDate: now,
  specificAttributes: [getNamedValue(), getNamedValue()],
  systemDate: now,
  mission: 'mySTRING',
  satellite: 1000,
  producer: getProvider(),
};

module.exports = override => (override ? _defaultsDeep({}, override, externalEvent) : externalEvent);
