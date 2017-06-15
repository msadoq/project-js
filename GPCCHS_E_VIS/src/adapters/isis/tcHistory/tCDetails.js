// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _map = require('lodash/map');
const tCDetailType = require('./tCDetailType');
const tCDetails = require('./tCDetails');
const {
  encodeAttribute,
  decodeAttribute,
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    tcDetailType: (data.tcDetailType !== null && typeof data.tcDetailType !== 'undefined')
      ? data.tcDetailType
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? encodeAttribute(data.value)
      : null,
    valueIsRaw: (data.valueIsRaw !== null && typeof data.valueIsRaw !== 'undefined')
      ? { value: data.valueIsRaw }
      : null,
    apId: (data.apId !== null && typeof data.apId !== 'undefined')
      ? { value: data.apId }
      : null,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? { value: data.sourceId }
      : null,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { value: data.sequenceCount }
      : null,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? { value: data.serviceType }
      : null,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? { value: data.serviceSubType }
      : null,
    argumentIds: _map(data.argumentIds, d => ({ value: stringToBytes(d) })),
    argumentValues: _map(data.argumentValues, d => (tCDetails.encode(d))),
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? { value: data.rawPacket }
      : null,
  }),
  decode: data => ({
    tcDetailType: (data.tcDetailType !== null && typeof data.tcDetailType !== 'undefined')
      ? { type: 'enum', value: data.tcDetailType, symbol: tCDetailType[data.tcDetailType] }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? decodeAttribute(data.value)
      : undefined,
    valueIsRaw: (data.valueIsRaw !== null && typeof data.valueIsRaw !== 'undefined')
      ? { type: 'boolean', value: data.valueIsRaw.value }
      : undefined,
    apId: (data.apId !== null && typeof data.apId !== 'undefined')
      ? { type: 'uinteger', value: data.apId.value }
      : undefined,
    sourceId: (data.sourceId !== null && typeof data.sourceId !== 'undefined')
      ? { type: 'uinteger', value: data.sourceId.value }
      : undefined,
    sequenceCount: (data.sequenceCount !== null && typeof data.sequenceCount !== 'undefined')
      ? { type: 'uinteger', value: data.sequenceCount.value }
      : undefined,
    serviceType: (data.serviceType !== null && typeof data.serviceType !== 'undefined')
      ? { type: 'uinteger', value: data.serviceType.value }
      : undefined,
    serviceSubType: (data.serviceSubType !== null && typeof data.serviceSubType !== 'undefined')
      ? { type: 'uinteger', value: data.serviceSubType.value }
      : undefined,
    argumentIds: _map(data.argumentIds, d => ({ type: 'identifier', value: bytesToString(d.value) })),
    argumentValues: _map(data.argumentValues, d => (tCDetails.decode(d))),
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? { type: 'blob', value: data.rawPacket.value }
      : undefined,
  }),
};
