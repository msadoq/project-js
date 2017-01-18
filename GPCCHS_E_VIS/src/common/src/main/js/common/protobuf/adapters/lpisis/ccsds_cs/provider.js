// Generated file
const serviceAddress = require('./serviceAddress');
const {
  ushortToBytes,
  bytesToUshort,
  uoctetToBytes,
  bytesToUoctet,

} = require('../types');

module.exports = {
  encode: data => ({
    slotID: (data.slotID !== null && typeof data.slotID !== 'undefined')
      ? { value: ushortToBytes(data.slotID) }
      : null,
    factoryID: (data.factoryID !== null && typeof data.factoryID !== 'undefined')
      ? { value: ushortToBytes(data.factoryID) }
      : null,
    providerName: (data.providerName !== null && typeof data.providerName !== 'undefined')
      ? { value: data.providerName }
      : null,
    network: (data.network !== null && typeof data.network !== 'undefined')
      ? { value: uoctetToBytes(data.network) }
      : null,
    session: (data.session !== null && typeof data.session !== 'undefined')
      ? { value: data.session }
      : null,
    serviceProperties: (data.serviceProperties !== null && typeof data.serviceProperties !== 'undefined')
      ? { value: data.serviceProperties }
      : null,
    serviceAddress: (data.serviceAddress !== null && typeof data.serviceAddress !== 'undefined')
      ? serviceAddress.encode(data.serviceAddress)
      : null,
    providerProperties: (data.providerProperties !== null && typeof data.providerProperties !== 'undefined')
      ? { value: data.providerProperties }
      : null,
    providerTime: (data.providerTime !== null && typeof data.providerTime !== 'undefined')
      ? { value: data.providerTime }
      : null,
  }),
  decode: data => ({
    slotID: (data.slotID !== null && typeof data.slotID !== 'undefined')
      ? { type: 'ushort', value: bytesToUshort(data.slotID.value) }
      : undefined,
    factoryID: (data.factoryID !== null && typeof data.factoryID !== 'undefined')
      ? { type: 'ushort', value: bytesToUshort(data.factoryID.value) }
      : undefined,
    providerName: (data.providerName !== null && typeof data.providerName !== 'undefined')
      ? { type: 'string', value: data.providerName.value }
      : undefined,
    network: (data.network !== null && typeof data.network !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.network.value) }
      : undefined,
    session: (data.session !== null && typeof data.session !== 'undefined')
      ? { type: 'ulong', value: data.session.value.toNumber() }
      : undefined,
    serviceProperties: (data.serviceProperties !== null && typeof data.serviceProperties !== 'undefined')
      ? { type: 'uinteger', value: data.serviceProperties.value }
      : undefined,
    serviceAddress: (data.serviceAddress !== null && typeof data.serviceAddress !== 'undefined')
      ? serviceAddress.decode(data.serviceAddress)
      : undefined,
    providerProperties: (data.providerProperties !== null && typeof data.providerProperties !== 'undefined')
      ? { type: 'string', value: data.providerProperties.value }
      : undefined,
    providerTime: (data.providerTime !== null && typeof data.providerTime !== 'undefined')
      ? { type: 'time', value: data.providerTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.providerTime !== null && typeof data.providerTime !== 'undefined')
        ? { type: 'time', value: data.providerTime.value.toNumber() }
        : undefined,
  }),
};

