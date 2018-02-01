// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getObjectType = require('../ccsds_com/objectType.stub');

const groupDefinition = {
  name: 'myIDENTIFIER',
  description: 'mySTRING',
  objectType: getObjectType(),
  domain: 10,
  instanceIds: [-1000, -1000],
};

module.exports = override => (override ? _defaultsDeep({}, override, groupDefinition) : groupDefinition);
