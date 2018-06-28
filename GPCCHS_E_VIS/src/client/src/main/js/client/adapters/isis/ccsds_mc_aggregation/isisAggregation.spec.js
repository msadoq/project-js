// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./isisAggregation');
const stub = require('./isisAggregation.stub')();

const generationMode = require('./generationMode');
const packetType = require('./packetType');
const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/ccsds_mc_aggregation/IsisAggregation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/IsisAggregation.proto`, { keepCase: true })
    .lookup('ccsds_mc_aggregation.protobuf.IsisAggregation');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      generationMode: { type: 'enum', value: stub.generationMode, symbol: generationMode[stub.generationMode] },
      filtered: { type: 'boolean', value: stub.filtered },
      deltaTime: { type: 'duration', value: stub.deltaTime },
      intervalTime: { type: 'duration', value: stub.intervalTime },
      setIntervalTime: { type: 'duration', value: stub.setIntervalTime },
      onboardDate: { type: 'time', value: stub.onboardDate },
      groundDate: { type: 'time', value: stub.groundDate },
      packetType: { type: 'enum', value: stub.packetType, symbol: packetType[stub.packetType] },
      apid: { type: 'ushort', value: stub.apid },
      service: { type: 'uoctet', value: stub.service },
      subService: { type: 'uoctet', value: stub.subService },
      destinationId: { type: 'uoctet', value: stub.destinationId },
    });
    expect(decoded.values).toHaveLength(stub.values.length);
    for (let i = 0; i < stub.values.length; i += 1) {
      expect(decoded.values[i]).toMatchObject({
        definition: {
          objectType: {
            area: { type: 'ushort', value: stub.values[i].definition.objectType.area },
            service: { type: 'ushort', value: stub.values[i].definition.objectType.service },
            version: { type: 'uoctet', value: stub.values[i].definition.objectType.version },
            number: { type: 'ushort', value: stub.values[i].definition.objectType.number },
          },
          objectKey: {
            domaineId: { type: 'ushort', value: stub.values[i].definition.objectKey.domaineId },
            uid: { type: 'long', symbol: `${stub.values[i].definition.objectKey.uid}` },
          },
        },
        extractedValue: { type: 'double', symbol: stub.values[i].extractedValue.toString() },
        rawValue: { type: 'double', symbol: stub.values[i].rawValue.toString() },
        convertedValue: { type: 'double', symbol: stub.values[i].convertedValue.toString() },
        triggerCounter: { type: 'ushort', value: stub.values[i].triggerCounter },
        monitoringState: { type: 'string', value: stub.values[i].monitoringState },
        validityState: { type: 'enum', value: stub.values[i].validityState, symbol: validityState[stub.values[i].validityState] },
      });
      
    }
  });
});
