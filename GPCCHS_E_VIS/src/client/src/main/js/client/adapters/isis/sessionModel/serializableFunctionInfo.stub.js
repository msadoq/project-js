// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getObjectId = require('../ccsds_com/objectId.stub');

const serializableFunctionInfo = {
  sessionOid: getObjectId(),
  eid: getObjectId(),
  name: 'mySTRING',
  feature: 'mySTRING',
  configuration: 'mySTRING',
  node: 'mySTRING',
  state: 100,
  confId: 10,
  autostart: true,
  funcType: 1,
  instanceNumber: 10,
  lastStateUpdateTime: 1000,
  availability: true,
  controlURI: 'mySTRING',
  viewURI: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, serializableFunctionInfo) : serializableFunctionInfo);
