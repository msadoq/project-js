// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./decommutedPacket');
const stub = require('./decommutedPacket.stub')();

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/decommutedPacket/DecommutedPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DecommutedPacket.proto`, { keepCase: true })
    .lookup('decommutedPacket.protobuf.DecommutedPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      onboardDate: { type: 'time', value: stub.onboardDate },
      groundDate: { type: 'time', value: stub.groundDate },
      isNominal: { type: 'boolean', value: stub.isNominal },
    });
    expect(decoded.decommutedValues).toHaveLength(stub.decommutedValues.length);
    for (let i = 0; i < stub.decommutedValues.length; i += 1) {
      expect(decoded.decommutedValues[i]).toMatchObject({
        name: { type: 'identifier', value: stub.decommutedValues[i].name },
        extractedValue: { type: 'double', symbol: stub.decommutedValues[i].extractedValue.toString() },
        rawValue: { type: 'double', symbol: stub.decommutedValues[i].rawValue.toString() },
        convertedValue: { type: 'double', symbol: stub.decommutedValues[i].convertedValue.toString() },
        validityState: { type: 'enum', value: stub.decommutedValues[i].validityState, symbol: validityState[stub.decommutedValues[i].validityState] },
      });
      
    }
  });
});
