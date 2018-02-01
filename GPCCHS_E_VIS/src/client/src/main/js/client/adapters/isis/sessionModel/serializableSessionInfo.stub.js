// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getObjectId = require('../ccsds_com/objectId.stub');

const serializableSessionInfo = {
  oid: getObjectId(),
  name: 'mySTRING',
  state: 100,
  id: 10,
  path: 'mySTRING',
  lastStateUpdateTime: 1000,
  healthStatus: 1,
  domain: 10,
  timeDelta: -1000,
  properties: 'mySTRING',
  variables: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, serializableSessionInfo) : serializableSessionInfo);
