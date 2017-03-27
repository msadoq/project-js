// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const generationMode = require('./generationMode');
const packetType = require('./packetType');
const parameter = require('./parameter');
const {
  ushortToBytes,
  bytesToUshort,
  uoctetToBytes,
  bytesToUoctet,

} = require('../types');

module.exports = {
  encode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? data.generationMode
      : null,
    filtered: (data.filtered !== null && typeof data.filtered !== 'undefined')
      ? { value: data.filtered }
      : null,
    deltaTime: (data.deltaTime !== null && typeof data.deltaTime !== 'undefined')
      ? { value: data.deltaTime }
      : null,
    intervalTime: (data.intervalTime !== null && typeof data.intervalTime !== 'undefined')
      ? { value: data.intervalTime }
      : null,
    setIntervalTime: (data.setIntervalTime !== null && typeof data.setIntervalTime !== 'undefined')
      ? { value: data.setIntervalTime }
      : null,
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? { value: data.onboardDate }
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? data.packetType
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
    values: _map(data.values, d => (parameter.encode(d))),
  }),
  decode: data => ({
    generationMode: (data.generationMode !== null && typeof data.generationMode !== 'undefined')
      ? { type: 'enum', value: data.generationMode, symbol: generationMode[data.generationMode] }
      : undefined,
    filtered: (data.filtered !== null && typeof data.filtered !== 'undefined')
      ? { type: 'boolean', value: data.filtered.value }
      : undefined,
    deltaTime: (data.deltaTime !== null && typeof data.deltaTime !== 'undefined')
      ? { type: 'duration', value: data.deltaTime.value }
      : undefined,
    intervalTime: (data.intervalTime !== null && typeof data.intervalTime !== 'undefined')
      ? { type: 'duration', value: data.intervalTime.value }
      : undefined,
    setIntervalTime: (data.setIntervalTime !== null && typeof data.setIntervalTime !== 'undefined')
      ? { type: 'duration', value: data.setIntervalTime.value }
      : undefined,
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? { type: 'time', value: data.onboardDate.value.toNumber() }
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    packetType: (data.packetType !== null && typeof data.packetType !== 'undefined')
      ? { type: 'enum', value: data.packetType, symbol: packetType[data.packetType] }
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
    values: _map(data.values, d => (parameter.decode(d))),
    referenceTimestamp: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
        ? { type: 'time', value: data.onboardDate.value.toNumber() }
        : undefined,
  }),
};

