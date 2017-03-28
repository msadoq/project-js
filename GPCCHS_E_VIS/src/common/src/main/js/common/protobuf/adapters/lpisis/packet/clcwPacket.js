// Produced by Acceleo JavaScript Generator 1.1.0

const {
  ushortToBytes,
  bytesToUshort,
  uoctetToBytes,
  bytesToUoctet,

} = require('../types');

module.exports = {
  encode: data => ({
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? { value: data.onboardDate }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: ushortToBytes(data.apid) }
      : null,
    service: (data.service !== null && typeof data.service !== 'undefined')
      ? { value: uoctetToBytes(data.service) }
      : null,
    subService: (data.subService !== null && typeof data.subService !== 'undefined')
      ? { value: uoctetToBytes(data.subService) }
      : null,
    destinationId: (data.destinationId !== null && typeof data.destinationId !== 'undefined')
      ? { value: uoctetToBytes(data.destinationId) }
      : null,
    isDecommuted: (data.isDecommuted !== null && typeof data.isDecommuted !== 'undefined')
      ? { value: data.isDecommuted }
      : null,
    primaryHeaderSize: (data.primaryHeaderSize !== null && typeof data.primaryHeaderSize !== 'undefined')
      ? { value: uoctetToBytes(data.primaryHeaderSize) }
      : null,
    secondaryHeaderSize: (data.secondaryHeaderSize !== null && typeof data.secondaryHeaderSize !== 'undefined')
      ? { value: uoctetToBytes(data.secondaryHeaderSize) }
      : null,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? { value: data.isNominal }
      : null,
    rawData: (data.rawData !== null && typeof data.rawData !== 'undefined')
      ? { value: data.rawData }
      : null,
  }),
  decode: data => ({
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? { type: 'time', value: data.onboardDate.value.toNumber() }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'ushort', value: bytesToUshort(data.apid.value) }
      : undefined,
    service: (data.service !== null && typeof data.service !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.service.value) }
      : undefined,
    subService: (data.subService !== null && typeof data.subService !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.subService.value) }
      : undefined,
    destinationId: (data.destinationId !== null && typeof data.destinationId !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.destinationId.value) }
      : undefined,
    isDecommuted: (data.isDecommuted !== null && typeof data.isDecommuted !== 'undefined')
      ? { type: 'boolean', value: data.isDecommuted.value }
      : undefined,
    primaryHeaderSize: (data.primaryHeaderSize !== null && typeof data.primaryHeaderSize !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.primaryHeaderSize.value) }
      : undefined,
    secondaryHeaderSize: (data.secondaryHeaderSize !== null && typeof data.secondaryHeaderSize !== 'undefined')
      ? { type: 'uoctet', value: bytesToUoctet(data.secondaryHeaderSize.value) }
      : undefined,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? { type: 'boolean', value: data.isNominal.value }
      : undefined,
    rawData: (data.rawData !== null && typeof data.rawData !== 'undefined')
      ? { type: 'blob', value: data.rawData.value.toBuffer() }
      : undefined,
    referenceTimestamp: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
        ? { type: 'time', value: data.onboardDate.value.toNumber() }
        : undefined,
  }),
};

