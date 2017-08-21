// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./decommutedValue');
const stub = require('./decommutedValue.stub')();

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/decommutedPacket/DecommutedValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DecommutedValue.proto`, { keepCase: true })
    .lookup('decommutedPacket.protobuf.DecommutedValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'identifier', value: stub.name },
      extractedValue: { type: 'double', symbol: stub.extractedValue.toString() },
      rawValue: { type: 'double', symbol: stub.rawValue.toString() },
      convertedValue: { type: 'double', symbol: stub.convertedValue.toString() },
      validityState: { type: 'enum', value: stub.validityState, symbol: validityState[stub.validityState] },
    });
    
  });
});
