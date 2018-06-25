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
  status: 100,
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
  lastUpdateModeLduId: 100,
  lastUpdateTimeLduId: now,
  lastUpdateModeSize: 100,
  lastUpdateTimeSize: now,
  lastUpdateModeStartTime: 100,
  lastUpdateTimeStartTime: now,
  lastUpdateModeEndTime: 100,
  lastUpdateTimeEndTime: now,
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: now,
  lastUpdateModeRemainSize: 100,
  lastUpdateTimeRemainSize: now,
  lastUpdateModePercent: 100,
  lastUpdateTimePercent: now,
  lastUpdateModeFailureCode: 100,
  lastUpdateTimeFailureCode: now,
  lastUpdateModeFileChecksum: 100,
  lastUpdateTimeFileChecksum: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus013Ldt) : pus013Ldt);
