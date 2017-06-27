// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus018ConfiguredObcp');
const stub = require('./pus018ConfiguredObcp.stub')();



describe('protobuf/isis/pusGroundModel/Pus018ConfiguredObcp', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus018ConfiguredObcp.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus018ConfiguredObcp');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      id: { type: 'uinteger', value: stub.id },
      hkParamNameForName: { type: 'string', value: stub.hkParamNameForName },
      hkParamNameForId: { type: 'string', value: stub.hkParamNameForId },
      hkParamNameForStatus: { type: 'string', value: stub.hkParamNameForStatus },
      hkParamNameForPriority: { type: 'string', value: stub.hkParamNameForPriority },
      hkParamNameForStepId: { type: 'string', value: stub.hkParamNameForStepId },
      status: { type: 'uinteger', value: stub.status },
      stepId: { type: 'uinteger', value: stub.stepId },
      priority: { type: 'uinteger', value: stub.priority },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
    });
    
  });
});
