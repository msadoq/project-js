// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./parameterValue');
const stub = require('./parameterValue.stub')();

const validityState = require('./validityState');

describe('protobuf/isis/ccsds_mc/ParameterValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ParameterValue.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.ParameterValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      convertedValue: { type: 'double', symbol: stub.convertedValue.toString() },
      extractedValue: { type: 'double', symbol: stub.extractedValue.toString() },
      rawValue: { type: 'double', symbol: stub.rawValue.toString() },
      isObsolete: { type: 'boolean', value: stub.isObsolete },
      triggerOnCounter: { type: 'ushort', value: stub.triggerOnCounter },
      triggerOffCounter: { type: 'ushort', value: stub.triggerOffCounter },
      monitoringState: { type: 'string', value: stub.monitoringState },
      validityState: { type: 'enum', value: stub.validityState, symbol: validityState[stub.validityState] },
    });
    
  });
});
