// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pusHeader = require('./pusHeader');

module.exports = {
  encode: data => ({
    encodingDate: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
      ? { value: data.encodingDate }
      : null,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.encode(data.pusHeader)
      : null,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? { value: data.rawPacket }
      : null,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? { value: data.tcId }
      : null,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? { value: data.tcSourceId }
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { value: data.sequenceCount }
      : null,
    parameterPhysicalValue: _map(data.parameterPhysicalValue, d => ({ value: d })),
  }),
  decode: data => ({
    encodingDate: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
      ? { type: 'time', value: data.encodingDate.value.toNumber() }
      : undefined,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.decode(data.pusHeader)
      : undefined,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? { type: 'blob', value: data.rawPacket.value.toBuffer() }
      : undefined,
    tcId: (data.tcId !== null && typeof data.tcId !== 'undefined')
      ? { type: 'integer', value: data.tcId.value }
      : undefined,
    tcSourceId: (data.tcSourceId !== null && typeof data.tcSourceId !== 'undefined')
      ? { type: 'uinteger', value: data.tcSourceId.value }
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { type: 'ulong', symbol: data.sequenceCount.value.toString() }
      : undefined,
    parameterPhysicalValue: _map(data.parameterPhysicalValue, d => ({ type: 'string', value: d.value })),
    referenceTimestamp: (data.encodingDate !== null && typeof data.encodingDate !== 'undefined')
        ? { type: 'time', value: data.encodingDate.value.toNumber() }
        : undefined,
  }),
};
