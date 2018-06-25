// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const pus013LdtPart = require('./pus013LdtPart');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    startTime: (data.startTime !== null && typeof data.startTime !== 'undefined')
      ? tIME.encode(data.startTime)
      : null,
    endTime: (data.endTime !== null && typeof data.endTime !== 'undefined')
      ? tIME.encode(data.endTime)
      : null,
    transferType: (data.transferType !== null && typeof data.transferType !== 'undefined')
      ? uINTEGER.encode(data.transferType)
      : null,
    lduId: (data.lduId !== null && typeof data.lduId !== 'undefined')
      ? uINTEGER.encode(data.lduId)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.encode(data.status)
      : null,
    size: (data.size !== null && typeof data.size !== 'undefined')
      ? uINTEGER.encode(data.size)
      : null,
    remainingSize: (data.remainingSize !== null && typeof data.remainingSize !== 'undefined')
      ? iNTEGER.encode(data.remainingSize)
      : null,
    percent: (data.percent !== null && typeof data.percent !== 'undefined')
      ? uINTEGER.encode(data.percent)
      : null,
    failureCode: (data.failureCode !== null && typeof data.failureCode !== 'undefined')
      ? sTRING.encode(data.failureCode)
      : null,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? uINTEGER.encode(data.fileId)
      : null,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? uINTEGER.encode(data.partitionId)
      : null,
    fileChecksum: (data.fileChecksum !== null && typeof data.fileChecksum !== 'undefined')
      ? sTRING.encode(data.fileChecksum)
      : null,
    fileTypeCode: (data.fileTypeCode !== null && typeof data.fileTypeCode !== 'undefined')
      ? uINTEGER.encode(data.fileTypeCode)
      : null,
    pUS013LdtPart: _map(data.pUS013LdtPart, d => (pus013LdtPart.encode(d))),
    noLDTParts: (data.noLDTParts !== null && typeof data.noLDTParts !== 'undefined')
      ? uINTEGER.encode(data.noLDTParts)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    lastUpdateModeLduId: (data.lastUpdateModeLduId !== null && typeof data.lastUpdateModeLduId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeLduId)
      : null,
    lastUpdateTimeLduId: (data.lastUpdateTimeLduId !== null && typeof data.lastUpdateTimeLduId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeLduId)
      : null,
    lastUpdateModeSize: (data.lastUpdateModeSize !== null && typeof data.lastUpdateModeSize !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeSize)
      : null,
    lastUpdateTimeSize: (data.lastUpdateTimeSize !== null && typeof data.lastUpdateTimeSize !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeSize)
      : null,
    lastUpdateModeStartTime: (data.lastUpdateModeStartTime !== null && typeof data.lastUpdateModeStartTime !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStartTime)
      : null,
    lastUpdateTimeStartTime: (data.lastUpdateTimeStartTime !== null && typeof data.lastUpdateTimeStartTime !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStartTime)
      : null,
    lastUpdateModeEndTime: (data.lastUpdateModeEndTime !== null && typeof data.lastUpdateModeEndTime !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeEndTime)
      : null,
    lastUpdateTimeEndTime: (data.lastUpdateTimeEndTime !== null && typeof data.lastUpdateTimeEndTime !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeEndTime)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeRemainSize: (data.lastUpdateModeRemainSize !== null && typeof data.lastUpdateModeRemainSize !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRemainSize)
      : null,
    lastUpdateTimeRemainSize: (data.lastUpdateTimeRemainSize !== null && typeof data.lastUpdateTimeRemainSize !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeRemainSize)
      : null,
    lastUpdateModePercent: (data.lastUpdateModePercent !== null && typeof data.lastUpdateModePercent !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModePercent)
      : null,
    lastUpdateTimePercent: (data.lastUpdateTimePercent !== null && typeof data.lastUpdateTimePercent !== 'undefined')
      ? tIME.encode(data.lastUpdateTimePercent)
      : null,
    lastUpdateModeFailureCode: (data.lastUpdateModeFailureCode !== null && typeof data.lastUpdateModeFailureCode !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFailureCode)
      : null,
    lastUpdateTimeFailureCode: (data.lastUpdateTimeFailureCode !== null && typeof data.lastUpdateTimeFailureCode !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeFailureCode)
      : null,
    lastUpdateModeFileChecksum: (data.lastUpdateModeFileChecksum !== null && typeof data.lastUpdateModeFileChecksum !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFileChecksum)
      : null,
    lastUpdateTimeFileChecksum: (data.lastUpdateTimeFileChecksum !== null && typeof data.lastUpdateTimeFileChecksum !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeFileChecksum)
      : null,
  }),
  decode: data => ({
    startTime: (data.startTime !== null && typeof data.startTime !== 'undefined')
      ? tIME.decode(data.startTime)
      : undefined,
    endTime: (data.endTime !== null && typeof data.endTime !== 'undefined')
      ? tIME.decode(data.endTime)
      : undefined,
    transferType: (data.transferType !== null && typeof data.transferType !== 'undefined')
      ? uINTEGER.decode(data.transferType)
      : undefined,
    lduId: (data.lduId !== null && typeof data.lduId !== 'undefined')
      ? uINTEGER.decode(data.lduId)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uINTEGER.decode(data.status)
      : undefined,
    size: (data.size !== null && typeof data.size !== 'undefined')
      ? uINTEGER.decode(data.size)
      : undefined,
    remainingSize: (data.remainingSize !== null && typeof data.remainingSize !== 'undefined')
      ? iNTEGER.decode(data.remainingSize)
      : undefined,
    percent: (data.percent !== null && typeof data.percent !== 'undefined')
      ? uINTEGER.decode(data.percent)
      : undefined,
    failureCode: (data.failureCode !== null && typeof data.failureCode !== 'undefined')
      ? sTRING.decode(data.failureCode)
      : undefined,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? uINTEGER.decode(data.fileId)
      : undefined,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? uINTEGER.decode(data.partitionId)
      : undefined,
    fileChecksum: (data.fileChecksum !== null && typeof data.fileChecksum !== 'undefined')
      ? sTRING.decode(data.fileChecksum)
      : undefined,
    fileTypeCode: (data.fileTypeCode !== null && typeof data.fileTypeCode !== 'undefined')
      ? uINTEGER.decode(data.fileTypeCode)
      : undefined,
    pUS013LdtPart: _map(data.pUS013LdtPart, d => (pus013LdtPart.decode(d))),
    noLDTParts: (data.noLDTParts !== null && typeof data.noLDTParts !== 'undefined')
      ? uINTEGER.decode(data.noLDTParts)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    lastUpdateModeLduId: (data.lastUpdateModeLduId !== null && typeof data.lastUpdateModeLduId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeLduId)
      : undefined,
    lastUpdateTimeLduId: (data.lastUpdateTimeLduId !== null && typeof data.lastUpdateTimeLduId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeLduId)
      : undefined,
    lastUpdateModeSize: (data.lastUpdateModeSize !== null && typeof data.lastUpdateModeSize !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeSize)
      : undefined,
    lastUpdateTimeSize: (data.lastUpdateTimeSize !== null && typeof data.lastUpdateTimeSize !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeSize)
      : undefined,
    lastUpdateModeStartTime: (data.lastUpdateModeStartTime !== null && typeof data.lastUpdateModeStartTime !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStartTime)
      : undefined,
    lastUpdateTimeStartTime: (data.lastUpdateTimeStartTime !== null && typeof data.lastUpdateTimeStartTime !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStartTime)
      : undefined,
    lastUpdateModeEndTime: (data.lastUpdateModeEndTime !== null && typeof data.lastUpdateModeEndTime !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeEndTime)
      : undefined,
    lastUpdateTimeEndTime: (data.lastUpdateTimeEndTime !== null && typeof data.lastUpdateTimeEndTime !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeEndTime)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeRemainSize: (data.lastUpdateModeRemainSize !== null && typeof data.lastUpdateModeRemainSize !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRemainSize)
      : undefined,
    lastUpdateTimeRemainSize: (data.lastUpdateTimeRemainSize !== null && typeof data.lastUpdateTimeRemainSize !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeRemainSize)
      : undefined,
    lastUpdateModePercent: (data.lastUpdateModePercent !== null && typeof data.lastUpdateModePercent !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModePercent)
      : undefined,
    lastUpdateTimePercent: (data.lastUpdateTimePercent !== null && typeof data.lastUpdateTimePercent !== 'undefined')
      ? tIME.decode(data.lastUpdateTimePercent)
      : undefined,
    lastUpdateModeFailureCode: (data.lastUpdateModeFailureCode !== null && typeof data.lastUpdateModeFailureCode !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFailureCode)
      : undefined,
    lastUpdateTimeFailureCode: (data.lastUpdateTimeFailureCode !== null && typeof data.lastUpdateTimeFailureCode !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeFailureCode)
      : undefined,
    lastUpdateModeFileChecksum: (data.lastUpdateModeFileChecksum !== null && typeof data.lastUpdateModeFileChecksum !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFileChecksum)
      : undefined,
    lastUpdateTimeFileChecksum: (data.lastUpdateTimeFileChecksum !== null && typeof data.lastUpdateTimeFileChecksum !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeFileChecksum)
      : undefined,
  }),
};
