// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus013LdtPart = require('./pus013LdtPart.stub');

const pus013Ldt = {
  lduId: 100,
  status: 'mySTRING',
  transferType: 100,
  fileTypeCode: 'mySTRING',
  startTime: 'mySTRING',
  endTime: 'mySTRING',
  size: 100,
  remainingSize: -100,
  percent: 100,
  failureCode: 'mySTRING',
  partitionId: 100,
  fileId: 'mySTRING',
  fileChecksum: 'mySTRING',
  pUS013LdtPart: [getPus013LdtPart(), getPus013LdtPart()],
  noLDTParts: 100,
  lastUpdateModeLduId: 100,
  lastUpdateTimeLduId: 'mySTRING',
  lastUpdateModeSize: 100,
  lastUpdateTimeSize: 'mySTRING',
  lastUpdateModeStartTime: 100,
  lastUpdateTimeStartTime: 'mySTRING',
  lastUpdateModeEndTime: 100,
  lastUpdateTimeEndTime: 'mySTRING',
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: 'mySTRING',
  lastUpdateModeRemainSize: 100,
  lastUpdateTimeRemainSize: 'mySTRING',
  lastUpdateModePercent: 100,
  lastUpdateTimePercent: 'mySTRING',
  lastUpdateModeFailureCode: 100,
  lastUpdateTimeFailureCode: 'mySTRING',
  lastUpdateModeFileChecksum: 100,
  lastUpdateTimeFileChecksum: 'mySTRING',
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus013Ldt) : pus013Ldt);
