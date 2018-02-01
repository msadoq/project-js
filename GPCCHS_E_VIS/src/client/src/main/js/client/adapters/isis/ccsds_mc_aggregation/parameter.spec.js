// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./parameter');
const stub = require('./parameter.stub')();

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/ccsds_mc_aggregation/Parameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Parameter.proto`, { keepCase: true })
    .lookup('ccsds_mc_aggregation.protobuf.Parameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      definition: {
        objectType: {
          area: { type: 'ushort', value: stub.definition.objectType.area },
          service: { type: 'ushort', value: stub.definition.objectType.service },
          version: { type: 'uoctet', value: stub.definition.objectType.version },
          number: { type: 'ushort', value: stub.definition.objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: stub.definition.objectKey.domaineId },
          uid: { type: 'long', symbol: `${stub.definition.objectKey.uid}` },
        },
      },
      extractedValue: { type: 'double', symbol: stub.extractedValue.toString() },
      rawValue: { type: 'double', symbol: stub.rawValue.toString() },
      convertedValue: { type: 'double', symbol: stub.convertedValue.toString() },
      triggerCounter: { type: 'ushort', value: stub.triggerCounter },
      monitoringState: { type: 'string', value: stub.monitoringState },
      validityState: { type: 'enum', value: stub.validityState, symbol: validityState[stub.validityState] },
    });
    
  });
});
