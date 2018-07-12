// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus012MonitoringCheckProperties = {
  rid: 100,
  ridLabel: 'mySTRING',
  ridStatus: 100,
  actionStatus: 100,
  actionName: 'mySTRING',
  mask: 'mySTRING',
  value: 'mySTRING',
  lastUpdateModeRid: 100,
  lastUpdateTimeRid: 'mySTRING',
  lastUpdateModeActionStatus: 100,
  lastUpdateTimeActionStatus: 'mySTRING',
  lastUpdateModeRidStatus: 100,
  lastUpdateTimeRidStatus: 'mySTRING',
  lastUpdateModeMask: 100,
  lastUpdateTimeMask: 'mySTRING',
  lastUpdateModeValue: 100,
  lastUpdateTimeValue: 'mySTRING',
  actionTcApid: 100,
  actionTcType: 100,
  actionTcSubType: 100,
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus012MonitoringCheckProperties) : pus012MonitoringCheckProperties);
