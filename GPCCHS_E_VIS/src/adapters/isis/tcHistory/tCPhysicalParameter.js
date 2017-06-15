// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _map = require('lodash/map');
const pusHeader = require('./pusHeader');
const tCDetailType = require('./tCDetailType');
const tCPhysicalParameter = require('./tCPhysicalParameter');
const {
  encodeAttribute,
  decodeAttribute,
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    argumentIdentifier: (data.argumentIdentifier !== null && typeof data.argumentIdentifier !== 'undefined')
      ? { value: stringToBytes(data.argumentIdentifier) }
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? encodeAttribute(data.value)
      : null,
    valueIsRaw: (data.valueIsRaw !== null && typeof data.valueIsRaw !== 'undefined')
      ? { value: data.valueIsRaw }
      : null,
    tcDetailsType: (data.tcDetailsType !== null && typeof data.tcDetailsType !== 'undefined')
      ? data.tcDetailsType
      : null,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.encode(data.pusHeader)
      : null,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? { value: data.rawPacket }
      : null,
    tcPhysicalParameter: _map(data.tcPhysicalParameter, d => (tCPhysicalParameter.encode(d))),
  }),
  decode: data => ({
    argumentIdentifier: (data.argumentIdentifier !== null && typeof data.argumentIdentifier !== 'undefined')
      ? { type: 'identifier', value: bytesToString(data.argumentIdentifier.value) }
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? decodeAttribute(data.value)
      : undefined,
    valueIsRaw: (data.valueIsRaw !== null && typeof data.valueIsRaw !== 'undefined')
      ? { type: 'boolean', value: data.valueIsRaw.value }
      : undefined,
    tcDetailsType: (data.tcDetailsType !== null && typeof data.tcDetailsType !== 'undefined')
      ? { type: 'enum', value: data.tcDetailsType, symbol: tCDetailType[data.tcDetailsType] }
      : undefined,
    pusHeader: (data.pusHeader !== null && typeof data.pusHeader !== 'undefined')
      ? pusHeader.decode(data.pusHeader)
      : undefined,
    rawPacket: (data.rawPacket !== null && typeof data.rawPacket !== 'undefined')
      ? { type: 'blob', value: data.rawPacket.value }
      : undefined,
    tcPhysicalParameter: _map(data.tcPhysicalParameter, d => (tCPhysicalParameter.decode(d))),
  }),
};
