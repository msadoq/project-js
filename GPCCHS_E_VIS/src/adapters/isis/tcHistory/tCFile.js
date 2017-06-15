// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _map = require('lodash/map');
const pusHeader = require('./pusHeader');

module.exports = {
  encode: data => ({
    encodingDate: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
      ? { value: data.encodingDate }
      : null,
    fileReference: (data.fileReference !== null && typeof data.fileReference !== 'undefined')
      ? { value: data.fileReference }
      : null,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.encode(data.pusHeader)
      : null,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? { value: data.rawPacket }
      : null,
    partition: (data.partition !== null && typeof data.partition !== 'undefined')
      ? { value: data.partition }
      : null,
    tc13: _map(data.tc13, d => ({ value: "TODO : CHANGE THIS !!!!" })),
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? { value: data.tcId }
      : null,
    generatedProcedure: (data.generatedProcedure !== null && typeof data.generatedProcedure !== 'undefined')
      ? { value: data.generatedProcedure }
      : null,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? { value: data.tcSourceId }
      : null,
    fileUri: (data.fileUri !== null && typeof data.fileUri !== 'undefined')
      ? { value: data.fileUri }
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { value: data.sequenceCount }
      : null,
    parameterPhysicalValue: _map(data.parameterPhysicalValue, d => ({ value: d })),
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? { value: data.fileType }
      : null,
    fileChecksum: (data.fileChecksum !== null && typeof data.fileChecksum !== 'undefined')
      ? { value: data.fileChecksum }
      : null,
  }),
  decode: data => ({
    encodingDate: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
      ? { type: 'time', value: data.encodingDate.value.toNumber() }
      : undefined,
    fileReference: (data.fileReference !== null && typeof data.fileReference !== 'undefined')
      ? { type: 'string', value: data.fileReference.value }
      : undefined,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.decode(data.pusHeader)
      : undefined,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? { type: 'blob', value: data.rawPacket.value }
      : undefined,
    partition: (data.partition !== null && typeof data.partition !== 'undefined')
      ? { type: 'string', value: data.partition.value }
      : undefined,
    tc13: _map(data.tc13, d => ("TODO : CHANGE THIS !!!!")),
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? { type: 'integer', value: data.tcId.value }
      : undefined,
    generatedProcedure: (data.generatedProcedure !== null && typeof data.generatedProcedure !== 'undefined')
      ? { type: 'string', value: data.generatedProcedure.value }
      : undefined,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? { type: 'uinteger', value: data.tcSourceId.value }
      : undefined,
    fileUri: (data.fileUri !== null && typeof data.fileUri !== 'undefined')
      ? { type: 'string', value: data.fileUri.value }
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { type: 'ulong', symbol: data.sequenceCount.value.toString() }
      : undefined,
    parameterPhysicalValue: _map(data.parameterPhysicalValue, d => ({ type: 'string', value: d.value })),
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? { type: 'string', value: data.fileType.value }
      : undefined,
    fileChecksum: (data.fileChecksum !== null && typeof data.fileChecksum !== 'undefined')
      ? { type: 'ulong', symbol: data.fileChecksum.value.toString() }
      : undefined,
    referenceTimestamp: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
        ? { type: 'time', value: data.encodingDate.value.toNumber() }
        : undefined,
  }),
};
