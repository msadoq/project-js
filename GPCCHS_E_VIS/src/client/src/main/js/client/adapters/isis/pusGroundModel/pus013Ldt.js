// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
      ? uINTEGER.encode(data.failureCode)
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
      ? uINTEGER.decode(data.failureCode)
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
  }),
};
