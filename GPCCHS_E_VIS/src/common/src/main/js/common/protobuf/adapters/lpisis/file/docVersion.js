// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');
const {
  encodeAttribute,
  decodeAttribute,
  ushortToBytes,
  bytesToUshort,

} = require('../types');

module.exports = {
  encode: data => ({
    externalVersion: (data.externalVersion !== null && typeof data.externalVersion !== 'undefined')
      ? { value: data.externalVersion }
      : null,
    internalVersion: (data.internalVersion !== null && typeof data.internalVersion !== 'undefined')
      ? { value: ushortToBytes(data.internalVersion) }
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
    content: (data.content !== null && typeof data.content !== 'undefined')
      ? encodeAttribute(data.content)
      : null,
  }),
  decode: data => ({
    externalVersion: (data.externalVersion !== null && typeof data.externalVersion !== 'undefined')
      ? { type: 'string', value: data.externalVersion.value }
      : undefined,
    internalVersion: (data.internalVersion !== null && typeof data.internalVersion !== 'undefined')
      ? { type: 'ushort', value: bytesToUshort(data.internalVersion.value) }
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
    content: (data.content !== null && typeof data.content !== 'undefined')
      ? decodeAttribute(data.content)
      : undefined,
  }),
};

