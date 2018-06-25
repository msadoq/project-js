// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const pus012MonitoringCheckProperties = {
  ridStatus: 100,
  actionStatus: 100,
  value: 'mySTRING',
  rid: 100,
  mask: 'mySTRING',
  actionName: 'mySTRING',
  ridLabel: 'mySTRING',
  lastUpdateModeRid: 100,
  lastUpdateTimeRid: now,
  lastUpdateModeActionStatus: 100,
  lastUpdateTimeActionStatus: now,
  lastUpdateModeRidStatus: 100,
  lastUpdateTimeRidStatus: now,
  lastUpdateModeMask: 100,
  lastUpdateTimeMask: now,
  lastUpdateModeValue: 100,
  lastUpdateTimeValue: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus012MonitoringCheckProperties) : pus012MonitoringCheckProperties);
