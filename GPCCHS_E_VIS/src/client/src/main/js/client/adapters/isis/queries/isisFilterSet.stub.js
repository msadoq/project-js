// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getCompositeFilter = require('../ccsds_com/compositeFilter.stub');
const getNamedValue = require('../ccsds_mal/namedValue.stub');

const isisFilterSet = {
  compositeFilter: [getCompositeFilter(), getCompositeFilter()],
  mapFunction: 'mySTRING',
  functionAttributes: [getNamedValue(), getNamedValue()],
};

module.exports = override => (override ? _defaultsDeep({}, override, isisFilterSet) : isisFilterSet);
