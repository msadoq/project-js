// Produced by Acceleo JavaScript Generator 1.1.0


module.exports = {
  encode: data => ({
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? { value: data.sourceId }
      : null,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? { value: data.commandApid }
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { value: data.sequenceCount }
      : null,
  }),
  decode: data => ({
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? { type: 'uinteger', value: data.sourceId.value }
      : undefined,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? { type: 'uinteger', value: data.commandApid.value }
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { type: 'uinteger', value: data.sequenceCount.value }
      : undefined,
  }),
};

