// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus013LdtPart = require('./pus013LdtPart.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus013Ldt = {
  startTime: now,
  endTime: now,
  transferType: 100,
  lduId: 100,
  status: 1,
  size: 100,
  remainingSize: -100,
  percent: 100,
  failureCode: 'mySTRING',
  fileId: 100,
  partitionId: 100,
  fileChecksum: 'mySTRING',
  fileTypeCode: 100,
  pUS013LdtPart: [getPus013LdtPart(), getPus013LdtPart()],
  noLDTParts: 100,
  pusElement: getPusElement(),
  lastUpdateModeLduId: 1,
  lastUpdateTimeLduId: now,
  lastUpdateModeSize: 1,
  lastUpdateTimeSize: now,
  lastUpdateModeStartTime: 1,
  lastUpdateTimeStartTime: now,
  lastUpdateModeEndTime: 1,
  lastUpdateTimeEndTime: now,
  lastUpdateModeStatus: 1,
  lastUpdateTimeStatus: now,
  lastUpdateModeRemainSize: 1,
  lastUpdateTimeRemainSize: now,
  lastUpdateModePercent: 1,
  lastUpdateTimePercent: now,
  lastUpdateModeFailureCode: 1,
  lastUpdateTimeFailureCode: now,
  lastUpdateModeFileChecksum: 1,
  lastUpdateTimeFileChecksum: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus013Ldt) : pus013Ldt);
