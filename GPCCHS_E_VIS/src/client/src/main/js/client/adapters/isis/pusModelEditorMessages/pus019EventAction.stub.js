// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus019EventAction = {
  apid: 100,
  rid: 100,
  actionStatus: 100,
  actionTcPacket: 'mySTRING',
  ridLabel: 'mySTRING',
  lastUpdateModeActionStatus: 100,
  lastUpdateTimeActionStatus: 'mySTRING',
  lastUpdateModeEventActionRid: 100,
  lastUpdateTimeEventActionRid: 'mySTRING',
  lastUpdateModeActionTc: 100,
  lastUpdateTimeActionTc: 'mySTRING',
  packetName: 'mySTRING',
  actionName: 'mySTRING',
  uniqueId: 1000,
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  apidName: 'mySTRING',
  actionDescription: 'mySTRING',
  actionTcApid: 100,
  actionTcType: 100,
  actionTcSubType: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus019EventAction) : pus019EventAction);
