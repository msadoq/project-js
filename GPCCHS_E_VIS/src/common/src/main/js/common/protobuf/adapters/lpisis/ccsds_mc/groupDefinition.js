// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const objectType = require('../ccsds_com/objectType');
const {
  ushortToBytes,
  bytesToUshort,
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { value: stringToBytes(data.name) }
      : null,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? { value: data.description }
      : null,
    objectType: (data.objectType !== null && typeof data.objectType !== 'undefined')
      ? objectType.encode(data.objectType)
      : null,
    domain: (data.domain !== null && typeof data.domain !== 'undefined')
      ? { value: ushortToBytes(data.domain) }
      : null,
    instanceIds: _map(data.instanceIds, d => ({ value: d })),
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? { type: 'identifier', value: bytesToString(data.name.value) }
      : undefined,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? { type: 'string', value: data.description.value }
      : undefined,
    objectType: (data.objectType !== null && typeof data.objectType !== 'undefined')
      ? objectType.decode(data.objectType)
      : undefined,
    domain: (data.domain !== null && typeof data.domain !== 'undefined')
      ? { type: 'ushort', value: bytesToUshort(data.domain.value) }
      : undefined,
    instanceIds: _map(data.instanceIds, d => ({ type: 'long', symbol: d.value.toString() })),
  }),
};
