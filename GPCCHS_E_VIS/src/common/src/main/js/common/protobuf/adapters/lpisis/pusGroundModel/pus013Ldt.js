// Produced by Acceleo JavaScript Generator 1.1.0
/* eslint-disable complexity, "DV6 TBC_CNES Generated code complexity is not avoidable" */

const _map = require('lodash/map');
const pus013LdtPart = require('./pus013LdtPart');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    startTime: (data.startTime !== null && typeof data.startTime !== 'undefined')
      ? { value: data.startTime }
      : null,
    endTime: (data.endTime !== null && typeof data.endTime !== 'undefined')
      ? { value: data.endTime }
      : null,
    transferType: (data.transferType !== null && typeof data.transferType !== 'undefined')
      ? { value: data.transferType }
      : null,
    lduId: (data.lduId !== null && typeof data.lduId !== 'undefined')
      ? { value: data.lduId }
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    size: (data.size !== null && typeof data.size !== 'undefined')
      ? { value: data.size }
      : null,
    remainingSize: (data.remainingSize !== null && typeof data.remainingSize !== 'undefined')
      ? { value: data.remainingSize }
      : null,
    percent: (data.percent !== null && typeof data.percent !== 'undefined')
      ? { value: data.percent }
      : null,
    failureCode: (data.failureCode !== null && typeof data.failureCode !== 'undefined')
      ? { value: data.failureCode }
      : null,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? { value: data.fileId }
      : null,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? { value: data.partitionId }
      : null,
    fileChecksum: (data.fileChecksum !== null && typeof data.fileChecksum !== 'undefined')
      ? { value: data.fileChecksum }
      : null,
    fileTypeCode: (data.fileTypeCode !== null && typeof data.fileTypeCode !== 'undefined')
      ? { value: data.fileTypeCode }
      : null,
    pUS013LdtPart: _map(data.pUS013LdtPart, d => (pus013LdtPart.encode(d))),
    noLDTParts: (data.noLDTParts !== null && typeof data.noLDTParts !== 'undefined')
      ? { value: data.noLDTParts }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    startTime: (data.startTime !== null && typeof data.startTime !== 'undefined')
      ? { type: 'time', value: data.startTime.value.toNumber() }
      : undefined,
    endTime: (data.endTime !== null && typeof data.endTime !== 'undefined')
      ? { type: 'time', value: data.endTime.value.toNumber() }
      : undefined,
    transferType: (data.transferType !== null && typeof data.transferType !== 'undefined')
      ? { type: 'uinteger', value: data.transferType.value }
      : undefined,
    lduId: (data.lduId !== null && typeof data.lduId !== 'undefined')
      ? { type: 'uinteger', value: data.lduId.value }
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    size: (data.size !== null && typeof data.size !== 'undefined')
      ? { type: 'uinteger', value: data.size.value }
      : undefined,
    remainingSize: (data.remainingSize !== null && typeof data.remainingSize !== 'undefined')
      ? { type: 'integer', value: data.remainingSize.value }
      : undefined,
    percent: (data.percent !== null && typeof data.percent !== 'undefined')
      ? { type: 'uinteger', value: data.percent.value }
      : undefined,
    failureCode: (data.failureCode !== null && typeof data.failureCode !== 'undefined')
      ? { type: 'uinteger', value: data.failureCode.value }
      : undefined,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? { type: 'uinteger', value: data.fileId.value }
      : undefined,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? { type: 'uinteger', value: data.partitionId.value }
      : undefined,
    fileChecksum: (data.fileChecksum !== null && typeof data.fileChecksum !== 'undefined')
      ? { type: 'string', value: data.fileChecksum.value }
      : undefined,
    fileTypeCode: (data.fileTypeCode !== null && typeof data.fileTypeCode !== 'undefined')
      ? { type: 'uinteger', value: data.fileTypeCode.value }
      : undefined,
    pUS013LdtPart: _map(data.pUS013LdtPart, d => (pus013LdtPart.decode(d))),
    noLDTParts: (data.noLDTParts !== null && typeof data.noLDTParts !== 'undefined')
      ? { type: 'uinteger', value: data.noLDTParts.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

