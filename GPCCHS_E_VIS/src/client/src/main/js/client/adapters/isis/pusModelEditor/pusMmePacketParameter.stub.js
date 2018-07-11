// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pusMmePacketParameter = {
  parameterId: 100,
  parameterName: 'mySTRING',
  parameterOrder: 100,
  parameterFilteredStatus: 'mySTRING',
  uniqueId: 1000,
  lastUpdateModeStoreId: 100,
  lastUpdateTimeStoreId: 'mySTRING',
  lastUpdateModeFilteredStatus: 100,
  lastUpdateTimeFilteredStatus: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pusMmePacketParameter) : pusMmePacketParameter);
