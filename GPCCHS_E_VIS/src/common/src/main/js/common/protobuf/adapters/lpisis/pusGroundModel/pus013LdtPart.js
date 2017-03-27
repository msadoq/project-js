// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { value: data.status }
      : null,
    partSize: (data.partSize !== null && typeof data.partSize !== 'undefined')
      ? { value: data.partSize }
      : null,
    partId: (data.partId !== null && typeof data.partId !== 'undefined')
      ? { value: data.partId }
      : null,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? { value: data.sourceId }
      : null,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? { value: data.commandApid }
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { value: data.sequenceCount }
      : null,
    serviceDataUnit: (data.serviceDataUnit !== null && typeof data.serviceDataUnit !== 'undefined')
      ? { value: data.serviceDataUnit }
      : null,
  }),
  decode: data => ({
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'uinteger', value: data.status.value }
      : undefined,
    partSize: (data.partSize !== null && typeof data.partSize !== 'undefined')
      ? { type: 'uinteger', value: data.partSize.value }
      : undefined,
    partId: (data.partId !== null && typeof data.partId !== 'undefined')
      ? { type: 'uinteger', value: data.partId.value }
      : undefined,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? { type: 'uinteger', value: data.sourceId.value }
      : undefined,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? { type: 'uinteger', value: data.commandApid.value }
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { type: 'uinteger', value: data.sequenceCount.value }
      : undefined,
    serviceDataUnit: (data.serviceDataUnit !== null && typeof data.serviceDataUnit !== 'undefined')
      ? { type: 'blob', value: data.serviceDataUnit.value.toBuffer() }
      : undefined,
  }),
};

